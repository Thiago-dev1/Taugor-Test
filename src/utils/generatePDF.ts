import { Template, generate, BLANK_PDF } from '@pdfme/generator'
import { base } from '../data'
import { Employee } from '../types/Employee';
import { EmployeeApi } from '../types/EmployeeApi';

const template: Template = {
  basePdf: base,
  schemas: [
    {
      "nome": {
        "type": "text",
        "position": {
          "x": 57.23,
          "y": 18.23
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
          "y": 30.99
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
          "y": 36.50
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
          "y": 42.40 
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
          "y": 70.10
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
          "y": 75.60
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
          "y": 81.20
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
          "y": 87.1
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
          "y": 108.39
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
          "y": 115.8
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


export async function execGenerate(employee: Employee | EmployeeApi) {
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
  await generate({ template, inputs }).then((pdf) => {

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

  });
}

