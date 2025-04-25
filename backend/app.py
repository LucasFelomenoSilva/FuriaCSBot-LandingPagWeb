from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)

model = genai.GenerativeModel('gemini-2.0-flash')
chat = model.start_chat()

@app.route("/api/mensagem", methods=["POST"])
def receber_mensagem():
    dados = request.get_json()
    mensagem_usuario = dados.get("mensagem", "")

    if not mensagem_usuario:
        return jsonify({"erro": "Mensagem vazia"}), 400

    resposta = chat.send_message(mensagem_usuario)
    return jsonify({"resposta": resposta.text})

if __name__ == "__main__":
    app.run(debug=True)
