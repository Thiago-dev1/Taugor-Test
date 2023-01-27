
import { Viewer, Template } from "@pdfme/ui";
import { base } from "../data";
import { Employee } from "../types/Employee";



const template: Template = {
    basePdf: base,
    schemas: [
      {
        "nome": {
          "type": "text",
          "position": {
            "x": 57.23,
            "y": 21.43
          },
          "width": 99.28,
          "height": 7,
          "alignment": "left",
          "fontSize": 17,
          "characterSpacing": 0,
          "lineHeight": 1,
          "fontColor": "#38b6ff"
        },
        "dataNascimento": {
          "type": "text",
          "position": {
            "x": 59.27,
            "y": 34.92
          },
          "width": 38.17,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "endereco": {
          "type": "text",
          "position": {
            "x": 41.8,
            "y": 39.94
          },
          "width": 35,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "genero": {
          "type": "text",
          "position": {
            "x": 39.16,
            "y": 45.77
          },
          "width": 60.13,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "cargo": {
          "type": "text",
          "position": {
            "x": 35.72,
            "y": 73.55
          },
          "width": 43.46,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "salario": {
          "type": "text",
          "position": {
            "x": 37.58,
            "y": 79.37
          },
          "width": 35,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "setor": {
          "type": "text",
          "position": {
            "x": 35.19,
            "y": 84.66
          },
          "width": 35,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "dataAdmissao": {
          "type": "text",
          "position": {
            "x": 56.62,
            "y": 90.5
          },
          "width": 35,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "email": {
          "type": "text",
          "position": {
            "x": 35.5,
            "y": 111.39
          },
          "width": 77.33,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        },
        "telefone": {
          "type": "text",
          "position": {
            "x": 41.54,
            "y": 118.8
          },
          "width": 52.46,
          "height": 4,
          "alignment": "left",
          "fontSize": 10,
          "characterSpacing": 0,
          "lineHeight": 1
        }
      }
    ],
};


 
export async function viewTest(domContainer:  HTMLElement, employee: Employee) {
    const inputs = [
        {
          "nome": employee.firstName + employee.lastName,
          "dataNascimento": employee.birthDate,
          "endereco": employee.address,
          "cargo": employee.office,
          "salario": String(employee.salary),
          "setor": employee.sector,
          "dataAdmissao": employee.admissionDate,
          "email": employee.email,
          "telefone": employee.phone,
          "genero": employee.gender == 'M' ? 'Masculino' : 'Feminino'
        }]
    
    const viewer = new Viewer({ domContainer, template, inputs });
}