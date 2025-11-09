# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mensajes genéricos y funciones auxiliares
def resp(text):
    return {"reply": text}

# Mapa del flujo basado en tu diagrama
MAIN_MENU_TEXT = (
    "¿Sobre qué área deseas información? Responde con el número:\n"
    "1. Derecho laboral\n2. Derecho civil\n3. Derecho agrario\n4. Derecho de familia\n5. Derecho penal\n0. Salir"
)

SUBMENUS = {
    "1": {
        "title":"Derecho laboral",
        "menu":"¿Sobre qué aspecto laboral deseas información?\n1. Contratos laborales\n2. Prestaciones\n3. Despidos\n4. Condiciones de trabajo\n0. Volver",
        "items":{
            "1": "Contratos laborales: los contratos deben incluir identificación de partes, objeto, salario, jornada y duración. Para iniciar un proceso formal se requieren copias del contrato, recibos de pago y pruebas de relación laboral.",
            "2": "Prestaciones: explicación de tipos de prestaciones (cesantías, prima, vacaciones) y por qué se generan. Reúne recibos y certificaciones de pago.",
            "3": "Despidos: conceptos y elementos a tener en cuenta (causa, pruebas, fechas). Guardar comunicaciones y pruebas para reclamar despido injustificado.",
            "4": "Condiciones de trabajo: seguridad, jornadas, acoso, herramientas. Recolecta pruebas y reportes internos."
        }
    },
    "2": {
        "title":"Derecho civil",
        "menu":"¿Sobre qué aspecto del derecho civil deseas información?\n1. Herencias\n2. Matrimonio\n3. Divorcio\n4. Obligaciones\n0. Volver",
        "items":{
            "1": "Herencias: conceptos básicos, documentos necesarios y cómo iniciar trámites.",
            "2": "Matrimonio: requisitos, efectos jurídicos y documentos para el registro.",
            "3": "Divorcio: tipos de divorcio y qué pruebas/pasos son necesarios.",
            "4": "Obligaciones: explicación sobre obligaciones civiles y cómo exigirlas."
        }
    },
    "3": {
        "title":"Derecho agrario",
        "menu":"¿Sobre qué aspecto del derecho agrario deseas información?\n1. Propiedad\n2. Posesión\n0. Volver",
        "items":{
            "1": "Propiedad: cómo demostrar propiedad (títulos, registros) y pasos para formalizar.",
            "2": "Posesión: conceptos y pruebas para acreditar posesión y reclamar derechos."
        }
    },
    "4": {
        "title":"Derecho de familia",
        "menu":"¿Sobre qué aspecto del derecho de familia deseas información?\n1. Unión libre\n2. Patria potestad\n3. Custodia de hijos\n4. Alimentos\n5. Adopción\n0. Volver",
        "items":{
            "1":"Unión libre: efectos legales y pruebas para demostrarla.",
            "2":"Patria potestad: qué es y pasos para reclamar o conservar derechos.",
            "3":"Custodia de hijos: consideraciones básicas y documentación común.",
            "4":"Alimentos: qué implica una demanda de alimentos y requisitos básicos.",
            "5":"Adopción: proceso general y requisitos iniciales."
        }
    },
    "5": {
        "title":"Derecho penal",
        "menu":"¿Sobre qué aspecto del derecho penal deseas información?\n1. Lesiones\n2. Violencia Intrafamiliar\n3. Estafas\n0. Volver",
        "items":{
            "1":"Lesiones: concepto y pruebas necesarias para denuncia penal.",
            "2":"Violencia Intrafamiliar: pasos inmediatos, denuncias y protección.",
            "3":"Estafas: qué recopilar para una denuncia y cómo proceder."
        }
    }
}

# Helper para crear pregunta de cierre
def cierre():
    return "¿Pude ayudarte con tu duda? Responde 'si' o 'no'."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json or {}
    message = (data.get('message') or "").strip().lower()
    state = data.get('state') or {"path": ""}

    path = state.get("path", "")
    responses = []

    # comando salir
    if message in ("salir", "0", "salir.", "0."):
        responses.append("Fue un gusto hablar contigo. Espero poder ayudarte de nuevo. 😊")
        # Reiniciar estado
        return jsonify({"responses": responses, "state": {"path": ""}})

    # Si en menú raíz
    if path == "" or path is None:
        # interpretamos selección del menu principal
        if message in ("1", "2", "3", "4", "5"):
            key = message
            submenu = SUBMENUS.get(key)
            if submenu:
                responses.append(f"Has elegido: {submenu['title']}.")
                responses.append(submenu['menu'])
                new_state = {"path": key}  # ahora en submenú
                return jsonify({"responses": responses, "state": new_state})
        # Si usuario escribe otra cosa, mostramos menú
        responses.append("No entendí tu respuesta.")
        responses.append(MAIN_MENU_TEXT)
        return jsonify({"responses": responses, "state": {"path": ""}})

    # Si estamos dentro de un submenú, path = e.g. "1"
    if path in SUBMENUS:
        submenu = SUBMENUS[path]
        # volver al menu anterior
        if message in ("0", "volver", "volver al menú", "volver."):
            responses.append("Regresando al menú principal.")
            responses.append(MAIN_MENU_TEXT)
            return jsonify({"responses": responses, "state": {"path": ""}})
        # si selecciona un item del submenú
        if message in submenu["items"].keys() or message in [str(k) for k in submenu["items"].keys()]:
            # Nota: keys son strings ya
            content = submenu["items"][message]
            responses.append(content)
            responses.append(cierre())
            # guardamos estado para poder gestionar la respuesta 'si'/'no'
            return jsonify({"responses": responses, "state": {"path": f"{path}.{message}"}})
        # si responde "salir"
        if message in ("salir",):
            responses.append("Fue un gusto. Si necesitas más ayuda, vuelve a consultar.")
            return jsonify({"responses": responses, "state": {"path": ""}})
        # fallback: re-display sub-menu
        responses.append("No entendí la selección.")
        responses.append(submenu['menu'])
        return jsonify({"responses": responses, "state": {"path": path}})

    # Si estamos en un punto de cierre como "1.1" (preguntamos si ayudó)
    if '.' in path:
        # esperar 'si' o 'no'
        if message in ("si", "sí", "s", "si."):
            responses.append("¡Qué gusto haber podido ayudarte! Te recuerdo que para una guía más completa debes consultar con un profesional en leyes.")
            # volver al menú principal
            responses.append(MAIN_MENU_TEXT)
            return jsonify({"responses": responses, "state": {"path": ""}})
        elif message in ("no", "n", "no."):
            responses.append("Lamento no poder ayudarte completamente. Si tu duda es compleja, te recomiendo consultar con un profesional en leyes.")
            responses.append(MAIN_MENU_TEXT)
            return jsonify({"responses": responses, "state": {"path": ""}})
        else:
            responses.append("Por favor responde 'si' o 'no'.")
            return jsonify({"responses": responses, "state": state})

    # Fallback general
    responses.append("No entendí. Volviendo al menú principal.")
    responses.append(MAIN_MENU_TEXT)
    return jsonify({"responses": responses, "state": {"path": ""}})

if __name__ == '__main__':
    app.run(debug=True)
