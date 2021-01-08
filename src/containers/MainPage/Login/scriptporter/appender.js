const appendScript = (scriptToAppend) => {
    console.log(scriptToAppend);
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    console.log(document.body.childNodes);
    document.body.appendChild(script);
    console.log(document.body.childNodes[11]);
}

export default appendScript;