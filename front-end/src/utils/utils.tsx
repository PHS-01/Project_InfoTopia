/**
 * Se o valor existir, adiciona ao FormData
 */
export function appendIfExists(key: string, value: File|string|number|null|undefined, fd: FormData) {
    if (value) fd.append(key, value)
}

/**
 * Filtra um objeto e retorna sua cópia sem os campos inválidos/nulos/indefinidos
 */
export function filterObject<T extends Record<string, any>>(obj: T): Partial<T> {
    const filteredObject: Partial<T> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value !== null && value !== undefined && value !== '') {
                filteredObject[key] = value;
            }
        }
    }

    return filteredObject;
}

/**
 * Verifica se o arquivo é uma imagem
 */
export function isImage(filename: string): boolean {
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg']

    const extension = filename.split('.').pop()?.toLowerCase()

    return extension ? validExtensions.includes(extension) : false
}

/**
 * Formata uma data para o padrão dd/mm/aaaa
 */
export function formatDate(inputDate: string): string {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

    if (dateRegex.test(inputDate)) return inputDate;

    if (!inputDate) return '';

    try {
        const date = new Date(inputDate)

        if (isNaN(date.getTime())) throw new Error('Data inválida');

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    } catch (error) {
        throw new Error('Formato de data inválido');
    }
}

/**
 * Verifica se um objeto está vazio
 */
export function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Verifica se o valor passado é uma string
 */
export function isString(value: unknown): value is string {
    return typeof value === "string";
}

interface Obj {
    [key: string]: string | [];
}

/**
 * Transforma um objeto em um array de strings
 */
export function objToArr(obj: Obj): Array<string> {
    const arr: Array<string> = []
    console.log(obj)
    for (const key in obj) {
        if (isString(obj[key])) {
            arr.push(obj[key])
        } else {
            obj[key].forEach(element => arr.push(element))
        }
    }
    return arr
}

export function castInt(n: string|number): number {
    return isString(n) ? parseInt(n) : n
}