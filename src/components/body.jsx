//@ts-check
/* Criar uma aplicação usando React JS que lista os jogos de hoje da copa, e permita seu papite neles.

Requisitos:

1. A lista dos jogos de hoje podem ser mockados, mas fique à vontade para criar ou consumir uma API de sua preferência. [CONCLUIDO]

2. Você precisa salvar o palpite pra não perdê-lo ao recarregar a página. Recomendamos: Local Storage. [EM ANDAMENTO]

3. Um palpite poderá ser alterado até 30min antes do início do jogo. [NÃO INICIADO]

4. Cada jogo deve ter: [CONCLUIDO]

   - Nome do time 1 e time 2
   - Abreviação do time 1 e time 2
   - Data e hora de início da partida
   - Estádio da partida

5. O palpite deve ser somente da quantidade de gols de cada time: [CONCLUIDO]

   Ex: BRA 2 x 3 CAM

6. A sua aplicação deve ser fácil de usar, clara e funcione corretamente. [CONCLUIDO]

Entrega:

- A aplicação deve estar no GitHub e deve informar os procedimentos para executá-la.

- Ao concluir o teste, responda a esse email, com o link do repositório. E se conseguiu executar ou não como queria...*/

// api: https://copa22.medeiro.tech/matches/today

import React, { useState, useEffect } from "react"
import { Button } from 'primereact/button';
import api from "../service/api"

export default function Body() {
  const [date] = useState(new Date())
  const [clubsApi, setClubsApi] = useState([])

  const requestApi = () => api.get("/matches/today").then((value) => setClubsApi(value.data))

  useEffect(() => { requestApi() }, [])

  const transformDay = () => {
    const lengthDay = date.getDate().toFixed().length

    if (lengthDay == 1) return `${date.getFullYear()}-${date.getMonth() + 1}-0${date.getDate()}`

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  const filtredForDay = () => {
    const fullDate = transformDay()
    // @ts-ignore
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
            <span>{value.date.slice(0, 10).replaceAll("-","/")}</span> <br /> <br />
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