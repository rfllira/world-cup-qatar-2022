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
import { Button } from 'primereact/button';

export default function Body() {
  const [date] = useState(new Date())
  const [clubsApi] = useState(
    [
      {
        "id": "clakj8jil0053ra2t13wmp567",
        "venue": "Khalifa International Stadium",
        "location": "Ar-Rayyan",
        "status": "scheduled",
        "stageName": "Round of 16",
        "time": "0'",
        "timeExtraInfo": {
          "current": "0'",
          "firstHalfTime": null,
          "firstHalfExtraTime": null,
          "secondHalfTime": null,
          "secondHalfExtraTime": null
        },
        "homeTeam": {
          "country": "NED",
          "goals": 0,
          "name": "Netherlands",
          "penalties": 0
        },
        "awayTeam": {
          "country": "USA",
          "goals": 0,
          "name": "USA",
          "penalties": 0
        },
        "officials": [
          {
            "name": "Wilton SAMPAIO",
            "role": "Referee",
            "country": "BRA"
          },
          {
            "name": "Bruno Boschilia",
            "role": "Assistant Referee 1",
            "country": "BRA"
          },
          {
            "name": "Bruno PIRES",
            "role": "Assistant Referee 2",
            "country": "BRA"
          },
          {
            "name": "Andres Matias MATONTE CABRERA",
            "role": "Fourth official",
            "country": "URU"
          },
          {
            "name": "Nicolás Gallo Barragán",
            "role": "Video Assistant Referee (VAR)",
            "country": "COL"
          },
          {
            "name": "Ashley Beecham",
            "role": "Offside VAR",
            "country": "AUS"
          },
          {
            "name": "Juan SOTO",
            "role": "Assistant VAR",
            "country": "VEN"
          },
          {
            "name": "Mauro Vigliano",
            "role": "Support VAR",
            "country": "ARG"
          },
          {
            "name": "Nicolás Taran",
            "role": "Reserve Assistant Referee",
            "country": "URU"
          }
        ],
        "createdAt": "2022-11-17T03:48:24.141Z",
        "date": "2022-12-03T15:00:00.000Z",
        "updatedAt": "2022-12-02T23:00:01.254Z"
      },
      {
        "id": "clakj8jil0057ra2tbheqxb6f",
        "venue": "Ahmad Bin Ali Stadium",
        "location": "Ar-Rayyan",
        "status": "scheduled",
        "stageName": "Round of 16",
        "time": "0'",
        "timeExtraInfo": {
          "current": "0'",
          "firstHalfTime": null,
          "firstHalfExtraTime": null,
          "secondHalfTime": null,
          "secondHalfExtraTime": null
        },
        "homeTeam": {
          "country": "ARG",
          "goals": 0,
          "name": "Argentina",
          "penalties": 0
        },
        "awayTeam": {
          "country": "AUS",
          "goals": 0,
          "name": "Australia",
          "penalties": 0
        },
        "officials": [
          {
            "name": "Szymon MARCINIAK",
            "role": "Referee",
            "country": "POL"
          },
          {
            "name": "Pawel SOKOLNICKI",
            "role": "Assistant Referee 1",
            "country": "POL"
          },
          {
            "name": "Tomasz LISTKIEWICZ",
            "role": "Assistant Referee 2",
            "country": "POL"
          },
          {
            "name": "Mario Alberto Escobar Toca",
            "role": "Fourth official",
            "country": "GUA"
          },
          {
            "name": "Tomasz KWIATKOWSKI",
            "role": "Video Assistant Referee (VAR)",
            "country": "POL"
          },
          {
            "name": "Alessandro Giallatini",
            "role": "Offside VAR",
            "country": "ITA"
          },
          {
            "name": "Marco Fritz",
            "role": "Assistant VAR",
            "country": "GER"
          },
          {
            "name": "Benoit MILLOT",
            "role": "Support VAR",
            "country": "FRA"
          },
          {
            "name": "Katie Nesbitt",
            "role": "Reserve Assistant Referee",
            "country": "USA"
          }
        ],
        "createdAt": "2022-11-17T03:48:24.141Z",
        "date": "2022-12-03T19:00:00.000Z",
        "updatedAt": "2022-12-02T23:00:01.728Z"
      }
    ]
  )

  const transformDay = () => {
    const lengthDay = date.getDate().toFixed().length

    if (lengthDay == 1) return `0${date.getDate()}`

    return date.getDate()
  }

  const filtredForDay = () => {
    const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${transformDay()}`
    const filtered = clubsApi.filter((value) => value.date.includes(fullDate))

    return filtered
  }

  const getMatchsToday = () => (
    filtredForDay().map((value) => (
      <div
        key={value.id}
        className="block-of-clubs">
        <div className="clubs">
          <div className="match-and-button">
            <span className="match">
              <p>{value.homeTeam.name} ({value.homeTeam.country}) {value.homeTeam.goals}</p>
              <p>X</p>
              <p> {value.awayTeam.goals} {value.awayTeam.name} ({value.awayTeam.country})</p>
            </span>
            <span className="palpite-area">
              <Button
                className="p-button-outlined"
                label="Dar Palpite"
                onClick={() => localStorage.setItem("homeTeamGoals", "2")}
              />
              <span
                className="palpite">
                Seu palpite foi: {value.homeTeam.country} {localStorage.getItem("homeTeamGoals") || 0} X {localStorage.getItem("awayTeamGoals") || 0} {value.awayTeam.country}
              </span>
            </span>
          </div>
          <p>
            <span>{value.date.slice(0, 10)}</span> <br /> <br />
            <span>Começa as {`${Number(value.date.slice(11, 13)) - 3}:${value.date.slice(14, 16)}`}</span> <br /> <br />
            <span>Local: {value.venue}</span>
          </p>
        </div>
      </div>
    ))
  )

  return (
    <div className="body">
      <h1>Eventos diários da Copa do mundo no Qatar 2022</h1>
      <div>{getMatchsToday()}</div>
    </div>
  )
}