"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, CheckCircle2, Clock, Route, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function Results() {
  const handleExport = (format: "csv" | "txt") => {
    // Simulate export
    alert(`Exportando dados em formato ${format.toUpperCase()}...`)
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
              <h1 className="text-xl font-bold text-foreground">Resultados da Execução</h1>
              <p className="text-sm text-muted-foreground">Análise e exportação de dados</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Execution Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resumo da Execução</CardTitle>
                  <CardDescription>Rota de Entrega A • Executada há 15 minutos</CardDescription>
                </div>
                <Badge className="bg-chart-5 hover:bg-chart-5">
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  Concluída
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Tempo Total</span>
                  </div>
                  <div className="text-2xl font-bold">2m 34s</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Route className="h-4 w-4" />
                    <span className="text-sm">Distância</span>
                  </div>
                  <div className="text-2xl font-bold">485 cm</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Velocidade Média</span>
                  </div>
                  <div className="text-2xl font-bold">3.1 cm/s</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Comandos</span>
                  </div>
                  <div className="text-2xl font-bold">5/5</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trajectory Details */}
          <Card>
            <CardHeader>
              <CardTitle>Trajetória Percorrida</CardTitle>
              <CardDescription>Sequência de comandos executados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, command: "Andar", value: "200 cm", time: "0:00 - 0:32", status: "success" },
                  { id: 2, command: "Girar", value: "90°", time: "0:32 - 0:45", status: "success" },
                  { id: 3, command: "Andar", value: "150 cm", time: "0:45 - 1:09", status: "success" },
                  { id: 4, command: "Liberar Carga", value: "-", time: "1:09 - 1:12", status: "success" },
                  { id: 5, command: "Andar", value: "135 cm", time: "1:12 - 2:34", status: "success" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                    <Badge variant="outline" className="font-mono">
                      {item.id}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.command}</span>
                        {item.value !== "-" && <span className="text-sm text-muted-foreground">{item.value}</span>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.time}</div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-chart-5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Telemetry Data */}
          <Card>
            <CardHeader>
              <CardTitle>Dados de Telemetria</CardTitle>
              <CardDescription>Informações coletadas durante a execução</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Posição Inicial</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">X:</span>
                      <span className="font-mono">50.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Y:</span>
                      <span className="font-mono">50.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rotação:</span>
                      <span className="font-mono">0°</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Posição Final</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">X:</span>
                      <span className="font-mono">73.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Y:</span>
                      <span className="font-mono">68.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rotação:</span>
                      <span className="font-mono">90°</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Sistema</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bateria Inicial:</span>
                      <span className="font-mono">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bateria Final:</span>
                      <span className="font-mono">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperatura Média:</span>
                      <span className="font-mono">41°C</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Conexão</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Qualidade do Sinal:</span>
                      <span className="font-mono">Excelente</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pacotes Perdidos:</span>
                      <span className="font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Latência Média:</span>
                      <span className="font-mono">12ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Exportar Dados</CardTitle>
              <CardDescription>Baixe os dados da execução em diferentes formatos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button onClick={() => handleExport("csv")} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar CSV
                </Button>
                <Button onClick={() => handleExport("txt")} variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar TXT
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Os arquivos incluirão todos os dados de telemetria, comandos executados e métricas de desempenho
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
