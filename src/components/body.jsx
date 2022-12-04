/* Criar uma aplicação usando React JS que lista os jogos de hoje da copa, e permita seu papite neles.

Requisitos:

1. A lista dos jogos de hoje podem ser mockados, mas fique à vontade para criar ou consumir uma API de sua preferência. [CONCLUIDO]

2. Você precisa salvar o palpite pra não perdê-lo ao recarregar a página. Recomendamos: Local Storage. [CONCLUIDO]

3. Um palpite poderá ser alterado até 30min antes do início do jogo. [EM ANDAMENTO]

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
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import api from "../service/api"

export default function Body() {
  const [date] = useState(new Date())
  const [minutsCurrent] = useState((date.getHours() * 60) + date.getMinutes())
  const [fullDate] = useState(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
  const [clubsApi, setClubsApi] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [homeTeam, setHomeTeam] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [getIndex, setGetIndex] = useState("")

  const requestApi = () => api.get("/matches/today").then((value) => setClubsApi(value.data))

  useEffect(() => { requestApi() }, [])

  clubsApi.map((value, index) => {
    for (let i = 0; i <= clubsApi.length; i++) {
      value[`palpite${index}`] = `Seu palpite: ${value.homeTeam.country} ${localStorage.getItem(`homeTeamGoals${index}`) || 0} X ${localStorage.getItem(`awayTeamGoals${index}`) || 0} ${value.awayTeam.country}`
    }
  })

  // console.log(minutsCurrent);
  // console.log(date.getHours() *60 + );

  return (
    <div className="body">
      <h1>Eventos diários da Copa do mundo no Qatar 2022</h1>
      {
        clubsApi.map((value, index) => (
          <div key={value.id} className="block-of-clubs">
            <div>
              <div>
                <span className="match">
                  <p>{value.homeTeam.name} ({value.homeTeam.country}) {value.homeTeam.goals}</p>
                  <p>X</p>
                  <p> {value.awayTeam.goals} {value.awayTeam.name} ({value.awayTeam.country})</p>
                </span>

                <span className="palpite-area">
                  <Button
                    className="p-button-outlined"
                    label="Dar Palpite"
                    disabled={(minutsCurrent >= (((Number(value.date.slice(11, 13)) - 3) * 60) + date.getMinutes())) ? true : false}
                    onClick={() => {
                      setShowDialog(true)
                      setAwayTeam(value.awayTeam.country)
                      setHomeTeam(value.homeTeam.country)
                      setGetIndex(index)
                      // console.log((Number(value.date.slice(11, 13)) - 7));
                      // console.log((Number(value.date.slice(11, 13)) - 3));
                      // console.log(((Number(value.date.slice(11, 13)) - 3) * 60));
                      // console.log((((Number(value.date.slice(11, 13)) - 3) * 60) + date.getMinutes()));
                    }}
                  />
                  <Dialog
                    visible={showDialog}
                    style={{ width: "400px" }}
                    onHide={() => setShowDialog(false)}
                    header={`Dar palpite na partida ${homeTeam} X ${awayTeam}`}
                    footer={() => (
                      <Button
                        label="Salvar"
                        icon="pi pi-check"
                        className="p-button-success"
                        onClick={() => {
                          localStorage.setItem(`showPalpite${getIndex}`, "true")
                          setShowDialog(false)
                        }}
                      />
                    )}
                  >
                    <div className="dialog">
                      <p>
                        {homeTeam}
                        <InputNumber
                          inputId="minmax-buttons"
                          value={localStorage.getItem(`homeTeamGoals${getIndex}`)}
                          onValueChange={(e) => localStorage.setItem(`homeTeamGoals${getIndex}`, `${e.value}`)}
                          mode="decimal"
                          showButtons min={0}
                          max={100}
                        />
                      </p>
                      <p>
                        {awayTeam}
                        <InputNumber
                          inputId="minmax-buttons"
                          value={localStorage.getItem(`awayTeamGoals${getIndex}`)}
                          onValueChange={(e) => localStorage.setItem(`awayTeamGoals${getIndex}`, `${e.value}`)}
                          mode="decimal"
                          showButtons min={0}
                          max={100}
                        />
                      </p>
                    </div>

                  </Dialog>
                  {
                    localStorage.getItem(`showPalpite${index}`) &&
                    <span className="palpite">
                      {value[`palpite${index}`]}
                    </span>
                  }
                </span>
              </div>

              <p>{fullDate}</p>
              <p>Começa as {`${Number(value.date.slice(11, 13)) - 3}:${value.date.slice(14, 16)}`}</p>
              <p>Local: {value.venue}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}