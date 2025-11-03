"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2, MoveVertical, RotateCw, Package } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type SendStatus = "idle" | "sending" | "success" | "error"

const mockTrajectory = {
  name: "Rota de Entrega A",
  commands: [
    { type: "move", value: 200, unit: "cm", icon: MoveVertical, color: "bg-blue-500" },
    { type: "rotate", value: 90, unit: "°", icon: RotateCw, color: "bg-purple-500" },
    { type: "move", value: 150, unit: "cm", icon: MoveVertical, color: "bg-blue-500" },
    { type: "release", value: 0, unit: "", icon: Package, color: "bg-green-500" },
    { type: "move", value: 100, unit: "cm", icon: MoveVertical, color: "bg-blue-500" },
  ],
}

export default function SendTrajectory() {
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle")
  const [storeInMemory, setStoreInMemory] = useState(false)

  const handleSend = () => {
    setSendStatus("sending")

    // Simulate sending
    setTimeout(() => {
      setSendStatus("success")
    }, 2000)
  }

  const resetStatus = () => {
    setSendStatus("idle")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Enviar Trajetória</h1>
              <p className="text-sm text-muted-foreground">Transmita a sequência completa para o carrinho</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trajetória Selecionada</CardTitle>
              <CardDescription>Sequência de {mockTrajectory.commands.length} comandos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <h3 className="font-semibold text-foreground">{mockTrajectory.name}</h3>
              </div>

              <div className="space-y-2">
                {mockTrajectory.commands.map((command, index) => {
                  const Icon = command.icon
                  return (
                    <div key={index} className={`${command.color} text-white rounded-lg p-3 shadow-sm`}>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="font-mono bg-white/20 text-white border-0">
                          {index + 1}
                        </Badge>
                        <Icon className="h-4 w-4" />
                        <span className="font-medium text-sm">
                          {command.type === "move" && "Andar"}
                          {command.type === "rotate" && "Girar"}
                          {command.type === "release" && "Liberar Carga"}
                        </span>
                        {command.unit && (
                          <span className="text-sm ml-auto">
                            {command.value} {command.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Trajectory Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selecionar Trajetória</CardTitle>
              <CardDescription>Escolha a trajetória que deseja enviar ao carrinho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border border-primary bg-primary/5 p-4 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Rota de Entrega A</h3>
                    <p className="text-sm text-muted-foreground mt-1">5 comandos • Criada há 2 horas</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Andar: 200cm
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Girar: 90°
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        +3 mais
                      </Badge>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4 cursor-pointer hover:bg-accent/5 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Rota de Teste B</h3>
                    <p className="text-sm text-muted-foreground mt-1">3 comandos • Criada ontem</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Andar: 150cm
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        +2 mais
                      </Badge>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-border" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Options */}
          <Card>
            <CardHeader>
              <CardTitle>Opções de Envio</CardTitle>
              <CardDescription>Configure como a trajetória será enviada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="store-memory"
                  checked={storeInMemory}
                  onCheckedChange={(checked) => setStoreInMemory(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="store-memory"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Armazenar na memória do carrinho
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    A trajetória será salva na memória local do carrinho para execução offline
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Send Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status de Envio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sendStatus === "idle" && (
                <div className="text-center py-8">
                  <div className="rounded-full bg-muted p-4 w-fit mx-auto mb-4">
                    <Send className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Pronto para enviar a sequência completa</p>
                </div>
              )}

              {sendStatus === "sending" && (
                <div className="text-center py-8">
                  <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto mb-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Enviando trajetória...</p>
                  <p className="text-xs text-muted-foreground">
                    Transmitindo {mockTrajectory.commands.length} comandos
                  </p>
                </div>
              )}

              {sendStatus === "success" && (
                <div className="text-center py-8">
                  <div className="rounded-full bg-chart-5/10 p-4 w-fit mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-chart-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Trajetória enviada com sucesso!</p>
                  <p className="text-xs text-muted-foreground">O carrinho está pronto para executar a sequência</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Link href="/telemetry">
                      <Button size="sm">Ver Telemetria</Button>
                    </Link>
                    <Button size="sm" variant="outline" onClick={resetStatus}>
                      Enviar Outra
                    </Button>
                  </div>
                </div>
              )}

              {sendStatus === "error" && (
                <div className="text-center py-8">
                  <div className="rounded-full bg-destructive/10 p-4 w-fit mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Erro ao enviar trajetória</p>
                  <p className="text-xs text-muted-foreground">Verifique a conexão e tente novamente</p>
                  <Button size="sm" variant="outline" onClick={resetStatus} className="mt-4 bg-transparent">
                    Tentar Novamente
                  </Button>
                </div>
              )}

              {sendStatus === "idle" && (
                <Button onClick={handleSend} className="w-full" size="lg">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Sequência Completa
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
