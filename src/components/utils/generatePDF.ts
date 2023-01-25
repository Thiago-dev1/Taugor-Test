import { Template, generate, BLANK_PDF } from '@pdfme/generator'
import { base } from '../../data'
import { Employee } from '../../pages/Create';

const template: Template = {
    basePdf: base,
    schemas: [{
        "phone": {
            "type": "text",
            "position": {
                "x": 41.22,
                "y": 114.11
            },
            "width": 35,
            "height": 5.68,
            "alignment": "left",
            "fontSize": 10,
            "characterSpacing": 0,
            "lineHeight": 1
        },
        "email": {
            "type": "text",
            "position": {
                "x": 36.73,
                "y": 108.01
            },
            "width": 35,
            "height": 5.68,
            "alignment": "left",
            "fontSize": 10,
            "characterSpacing": 0,
            "lineHeight": 1
        },
        "job": {
            "type": "text",
            "position": {
                "x": 25.4,
                "y": 75.14
            },
            "width": 35,
            "height": 7,
            "alignment": "left",
            "fontSize": 13,
            "characterSpacing": 0,
            "lineHeight": 1
        },
        "name": {
            "type": "text",
            "position": {
                "x": 26.72,
                "y": 24.34
            },
            "width": 35,
            "height": 7,
            "alignment": "left",
            "fontSize": 18,
            "characterSpacing": 0,
            "lineHeight": 1,
            "fontColor": "#7996ec"
        }
    }],
};

let inputs = [{}]

export function insertInput(employee: Employee) {
     inputs = [
        {
            "phone": employee.phone,
            "email": employee.email,
            "job": employee.job,
            "name": employee.firstName + ' ' + employee.lastName
        }]
}

export async function execGenerate() {
    await generate({ template, inputs }).then((pdf) => {

        const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
        window.open(URL.createObjectURL(blob));
    
    });
}

