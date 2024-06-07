import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
@Controller("healt")
export class Healt {

  constructor(
  ) {}

  @Get('liveness')
  @ApiOperation({ summary: "Endpoint para saber si el servicio esta arriba" })
  @ApiResponse({ status: 200, description: "se creo la personas" })
  @ApiResponse({ status: 400, description: "el servicio no esta arriba" })
  async livenessC() {
    return { status: 200, message: "ok liveness" }
  }

  @Get('readiness')
  @ApiOperation({ summary: "Endpoint para validar el servicio en kubernetes " })
  @ApiResponse({ status: 200, description: "prueba persona exitosas" })
  @ApiResponse({ status: 400, description: "prueba no personas" })
  async readinessC(){
    return { status: 200, message: "ok readiness" }
  }

}
