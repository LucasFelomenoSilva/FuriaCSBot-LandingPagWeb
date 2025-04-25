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

contexto = "Você é um assistente especializado em FURIA Esports no cenario do CS. Sempre forneça respostas relacionadas ao time, seus jogadores, histórico e próximos eventos, sem ser explícito demais sobre o time. Mantenha a conversa natural e focada na FURIAGG."

@app.route("/api/mensagem", methods=["POST"])
def receber_mensagem():
    dados = request.get_json()
    mensagem_usuario = dados.get("mensagem", "")

    if not mensagem_usuario:
        return jsonify({"erro": "Mensagem vazia"}), 400

    prompt_completo = f"{contexto}\nUsuário: {mensagem_usuario}\nAssistente:"

    resposta = chat.send_message(prompt_completo)
    
    return jsonify({"resposta": resposta.text})

if __name__ == "__main__":
    app.run(debug=True)
