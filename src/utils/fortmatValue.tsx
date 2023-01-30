export function formateValue(value: number) {
    const valueFormat = new Intl.NumberFormat('pt-NR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)

    return valueFormat
}