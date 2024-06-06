from transformers import Llama2ForCausalLM, Llama2Tokenizer

def setup_model():
    model_name = "Llama-2-7b-chat-hf"
    tokenizer = Llama2Tokenizer.from_pretrained(model_name)
    model = Llama2ForCausalLM.from_pretrained(model_name)
    return tokenizer, model

tokenizer, model = setup_model()

def generate_text(prompt):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return generated_text

if __name__ == "__main__":
    import sys
    input_prompt = sys.argv[1]
    print(generate_text(input_prompt))
