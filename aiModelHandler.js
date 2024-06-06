const { AutoTokenizer, AutoModelForCausalLM } = require('transformers');

let tokenizer, model;

const loadModel = async () => {
    tokenizer = await AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf");
    model = await AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf");
    console.log("Model loaded successfully");
};

const handleMessage = async (text) => {
    const inputs = tokenizer(text, return_tensors='pt');
    const outputs = await model.generate(inputs);
    return tokenizer.decode(outputs[0], skip_special_tokens=true);
};

module.exports = { loadModel, handleMessage };

