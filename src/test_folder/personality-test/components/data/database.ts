const PREFIX: string = 'personality-test-data'

export const setData = (data: any) => {
    localStorage.setItem(PREFIX, JSON.stringify(data || []))
}

export const getData = () => {
    return JSON.parse(localStorage.getItem(PREFIX) || '[]')
}