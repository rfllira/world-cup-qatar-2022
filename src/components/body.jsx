import { InputNumber } from 'primereact/inputnumber';
import React, { useState, useEffect } from "react"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import api from "../service/api"

export default function Body() {
  const [date] = useState(new Date())
  const [clubsApi, setClubsApi] = useState([])
  const [getIndex, setGetIndex] = useState("")
  const [awayTeam, setAwayTeam] = useState("")
  const [homeTeam, setHomeTeam] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [minutsCurrent] = useState((date.getHours() * 60) + date.getMinutes())
  const [fullDate] = useState(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)

  const requestApi = () => api.get("/matches/today").then((value) => setClubsApi(value.data))
  const resetLocalStorage = () => {
    if (localStorage.getItem("day") != date.getDate()) localStorage.clear()
  }

  useEffect(() => {
    requestApi()
    resetLocalStorage()
  }, [])

  clubsApi.map((value, index) => {
    for (let i = 0; i <= clubsApi.length; i++) {
      value[`palpite${index}`] = `Seu palpite: ${value.homeTeam.country} ${localStorage.getItem(`homeTeamGoals${index}`) || 0} X ${localStorage.getItem(`awayTeamGoals${index}`) || 0} ${value.awayTeam.country}`
    }
  })

  return (

    <div>
      <div className='title'>
        <h1>Horário dos confrontos Copa do mundo 2022 no Qatar</h1>
      </div>
      <div className="body">
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
                      label={localStorage.getItem(`showPalpite${index}`) ? "Editar Palpite" : "Dar Palpite"}
                      disabled={(minutsCurrent >= (((Number(value.date.slice(11, 13)) - 3) * 60) - 30)) ? true : false}
                      onClick={() => {
                        setShowDialog(true)
                        setAwayTeam(value.awayTeam.country)
                        setHomeTeam(value.homeTeam.country)
                        setGetIndex(index)
                      }}
                    />
                    {
                      (minutsCurrent >= (((Number(value.date.slice(11, 13)) - 3) * 60) - 30)) ? (
                        <div className='alert'>
                          <span>Periodo de palpite esgotado</span>
                        </div>) :
                        (<span></span>)
                    }
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
                            value={localStorage.getItem(`homeTeamGoals${getIndex}`) || 0}
                            // onValueChange={(e) => localStorage.setItem(`homeTeamGoals${getIndex}`, `${e.value}`)}
                            onValueChange={(e) => {
                              localStorage.setItem(`homeTeamGoals${getIndex}`, `${e.value}`)
                              localStorage.setItem("day", `${date.getDate()}`)
                            }}
                            mode="decimal"
                            showButtons min={0}
                            max={100}
                          />
                        </p>
                        <p>
                          {awayTeam}
                          <InputNumber
                            inputId="minmax-buttons"
                            value={localStorage.getItem(`awayTeamGoals${getIndex}`) || 0}
                            onValueChange={(e) => {
                              localStorage.setItem(`awayTeamGoals${getIndex}`, `${e.value}`)
                              localStorage.setItem("day", `${date.getDate()}`)
                            }}
                            mode="decimal"
                            showButtons min={0}
                            max={100}
                          />
                        </p>

                        <p>ATENÇÃO: você poderá modificar seu palpite até 30 minutos antes do inicio da partida.</p>
                      </div>

                    </Dialog>
                    {
                      localStorage.getItem(`showPalpite${index}`) &&
                      <div className="palpite">
                        <span>
                          {value[`palpite${index}`]}
                        </span>
                      </div>
                    }
                  </span>
                </div>

                <div className='infosMatch'>
                  <p>
                    <Button
                      label={`${fullDate}`}
                      disabled="true"
                      className="p-button-raised p-button-text p-button-plain"
                    />

                    <Button
                      label={`${Number(value.date.slice(11, 13)) - 3}:${value.date.slice(14, 16)}`}
                      disabled="true"
                      className="p-button-raised p-button-text p-button-plain"
                    />
                  </p>

                  <p>
                    <Button
                      label={`Local: ${value.venue}`}
                      disabled="true"
                      className="p-button-raised p-button-text p-button-plain"
                    />
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}