var programming_languages=[
    "python",
    "javascript",
    "ruby",
    "c",
    "rubyon rails",
    "html",
    "pascal",
    "R",
    "java",
    "php",
    "kotlin"
]
function randomWord(){
    return programming_languages[Math.floor(Math.random()*programming_languages.length)]
}
export {randomWord}