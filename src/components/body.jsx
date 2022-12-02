//@ts-check
/* Criar uma aplicação usando React JS que lista os jogos de hoje da copa, e permita seu papite neles.

Requisitos:

1. A lista dos jogos de hoje podem ser mockados, mas fique à vontade para criar ou consumir uma API de sua preferência.

2. Você precisa salvar o palpite pra não perdê-lo ao recarregar a página. Recomendamos: Local Storage.

3. Um palpite poderá ser alterado até 30min antes do início do jogo.

4. Cada jogo deve ter:

   - Nome do time 1 e time 2
   - Abreviação do time 1 e time 2
   - Data e hora de início da partida
   - Estádio da partida

5. O palpite deve ser somente da quantidade de gols de cada time:

   Ex: BRA 2 x 3 CAM

6. A sua aplicação deve ser fácil de usar, clara e funcione corretamente.

Entrega:

- A aplicação deve estar no GitHub e deve informar os procedimentos para executá-la.

- Ao concluir o teste, responda a esse email, com o link do repositório. E se conseguiu executar ou não como queria...*/

// api: https://raw.githubusercontent.com/openfootball/worldcup.json/master/2022/worldcup.json

import React, { useState } from "react"

export default function Body() {
  const [date] = useState(new Date())
  const [clubsApi] = useState(
    [
      {
        "round": "Matchday 13",
        "group": "Group G",
        "date": "2022-12-02",
        "team1": "Serbia",
        "team2": "Switzerland"
      },
      {
        "round": "Matchday 13",
        "group": "Group G",
        "date": "2022-12-02",
        "team1": "Cameroon",
        "team2": "Brazil"
      },
      {
        "round": "Matchday 13",
        "group": "Group H",
        "date": "2022-12-02",
        "team1": "Ghana",
        "team2": "Uruguay"
      },
      {
        "round": "Matchday 13",
        "group": "Group H",
        "date": "2022-12-02",
        "team1": "South Korea",
        "team2": "Portugal"
      },
      {
        "round": "Matchday 13",
        "group": "Group G",
        "date": "2022-12-10",
        "team1": "Serbia",
        "team2": "Switzerland"
      },
      {
        "round": "Matchday 13",
        "group": "Group G",
        "date": "2022-12-10",
        "team1": "Cameroon",
        "team2": "Brazil"
      },
      {
        "round": "Matchday 13",
        "group": "Group H",
        "date": "2022-12-10",
        "team1": "Ghana",
        "team2": "Uruguay"
      },
      {
        "round": "Matchday 13",
        "group": "Group H",
        "date": "2022-12-10",
        "team1": "South Korea",
        "team2": "Portugal"
      },
    ]
  )

  const transformDay = () => {
    const lengthDay = date.getDate().toFixed().length

    if (lengthDay == 1) return `0${date.getDate()}`

    return date.getDate()
  }

  const filtredForDay = () => {
    const fullDate = `${date.getFullYear()}-${date.getMonth()+1}-${transformDay()}`
    const filtered = clubsApi.filter((value) => value.date == fullDate)

    return filtered
  }

  const getMatchsToday = () => (
    filtredForDay().map((value, index) => (
      <div>
        <p key={index}>
          <span>{value.team1} x {value.team2} <br /></span>
          <span>{value.date}<br /></span>
        </p>
      </div>
    ))
  )

  return (
    <div className="Body">
      <h1>Hoje</h1>
      <div>
        {
          getMatchsToday()
        }

      </div>
    </div>
  )
}