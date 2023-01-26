
import { Viewer, Template } from "@pdfme/ui";
import { base } from "../data";
import { Employee } from "../pages/Create";



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
              "width": 94.27,
              "height": 8.06,
              "alignment": "left",
              "fontSize": 17,
              "characterSpacing": 0,
              "lineHeight": 1,
              "fontColor": "#38b6ff"
            },
            "dataNascimento": {
              "type": "text",
              "position": {
                "x": 59.01,
                "y": 33.33
              },
              "width": 38.17,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "nacionalidede": {
              "type": "text",
              "position": {
                "x": 49.74,
                "y": 37.83
              },
              "width": 35,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "endereco": {
              "type": "text",
              "position": {
                "x": 41.8,
                "y": 43.92
              },
              "width": 60.13,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "cargo": {
              "type": "text",
              "position": {
                "x": 34.92,
                "y": 76.72
              },
              "width": 43.46,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "salario": {
              "type": "text",
              "position": {
                "x": 37.31,
                "y": 80.96
              },
              "width": 35,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "setor": {
              "type": "text",
              "position": {
                "x": 35.19,
                "y": 85.19
              },
              "width": 35,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "dataAdmissao": {
              "type": "text",
              "position": {
                "x": 55.03,
                "y": 89.44
              },
              "width": 35,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "email": {
              "type": "text",
              "position": {
                "x": 35.24,
                "y": 111.92
              },
              "width": 77.33,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "telefone": {
              "type": "text",
              "position": {
                "x": 41.54,
                "y": 119.33
              },
              "width": 52.46,
              "height": 3.5,
              "alignment": "left",
              "fontSize": 10,
              "characterSpacing": 0,
              "lineHeight": 1
            },
            "emprego": {
              "type": "text",
              "position": {
                "x": 46.04,
                "y": 67.73
              },
              "width": 68.33,
              "height": 7,
              "alignment": "left",
              "fontSize": 17,
              "characterSpacing": 0,
              "lineHeight": 1,
              "fontColor": "#38baff"
            }
          }
    ],
};


 
export async function viewTest(domContainer:  HTMLElement, employee: Employee) {
    const inputs = [
        {
            "nome": employee.firstName + ' ' + employee.lastName,
            "dataNascimento": employee.birthDate,
            "nacionalidede": employee.nationality,
            "emprego": employee.job,
            "endereco": employee.address,
            "cargo": employee.office,
            "salario": String(employee.salary),
            "setor": employee.sector,
            "dataAdmissao": employee.admissionDate,
            "email": employee.email,
            "telefone": employee.phone
        }]
    
    const viewer = new Viewer({ domContainer, template, inputs });
}