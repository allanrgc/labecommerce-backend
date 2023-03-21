function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)  + min)
  }

  const parOuImpar = process.argv[2]

  const numero = Number(process.argv[3])

  const soma = getRndInteger(0,10) + numero

  if (soma % 2 === 0){
    if(parOuImpar === "par"){
        // console.log(parOuImpar, soma)
        console.log(`você colocou ${parOuImpar} e o número ${numero}. A soma deu ${soma}. Parabéns. Vitória justa`)
    }else {
        console.log(`Você perdeu, fiote de shiba. Você colocou ${numero} e a soma deu ${soma} que é par`)
    }
  }else if(soma % 2 !== 0){
    if(parOuImpar === "impar"){
        console.log(`Ganhou... você: ${numero}. PC: ${soma - numero}. A soma deu ${soma}.`)
    }else {
        console.log(`PEDEEU. Cê pôs ${numero} e o pc ${soma - numero}. Ou seja ${soma} que é IMPARRRR`)
    }
  }