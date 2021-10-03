import { clear } from "console";
import { ActionItems, Timeline } from "../types"

type UiModes = 'light' | 'dark';

export const getUIMode = (): UiModes => {
    switch (localStorage.getItem("uiMode")) {
        case "dark":
            return 'dark'
        default:
            return 'light'
    }
}
export const setUIMode = (value: string) => {
    localStorage.setItem("uiMode", value)
}

export const getTitle = localStorage.getItem("title") || ""
export const setTitle = (value: string) => {
    localStorage.setItem("title", value)
}

export const getStatus = localStorage.getItem("status") || ""
export const setStatus = (value: string) => {
    localStorage.setItem("status", value)
}

export const getAuthors = localStorage.getItem("authors") || ""
export const setAuthors = (value: string) => {
    localStorage.setItem("authors", value)
}

export const getSummary = localStorage.getItem("summary") || ""
export const setSummary = (value: string) => {
    localStorage.setItem("summary", value)
}

export const getImpact = localStorage.getItem("impact") || ""
export const setImpact = (value: string) => {
    localStorage.setItem("impact", value)
}

export const getRootCauses = localStorage.getItem("rootCauses") || ""
export const setRootCauses = (value: string) => {
    localStorage.setItem("rootCauses", value)
}

export const getTrigger = localStorage.getItem("trigger") || ""
export const setTrigger = (value: string) => {
    localStorage.setItem("trigger", value)
}

export const getResolution = localStorage.getItem("resolution") || ""
export const setResolution = (value: string) => {
    localStorage.setItem("resolution", value)
}

export const getDetection = localStorage.getItem("detection") || ""
export const setDetection = (value: string) => {
    localStorage.setItem("detection", value)
}

export const getActionItems = () => {
    const data: ActionItems = JSON.parse(localStorage.getItem("actionItems") || `[]`)
    return data
}
export const setActionItems = (value: ActionItems) => {
    localStorage.setItem("actionItems", JSON.stringify(value))
}

export const getWhatWentWell = localStorage.getItem("whatWentWell") || ""
export const setWhatWentWell = (value: string) => {
    localStorage.setItem("whatWentWell", value)
}

export const getWhatWentWrong = localStorage.getItem("whatWentWrong") || ""
export const setWhatWentWrong = (value: string) => {
    localStorage.setItem("whatWentWrong", value)
}

export const getWhereWeGotLucky = localStorage.getItem("whereWeGotLucky") || ""
export const setWhereWeGotLucky = (value: string) => {
    localStorage.setItem("whereWeGotLucky", value)
}

export const getTimeline = () => {
    const data: Timeline = JSON.parse(localStorage.getItem("timeline") || `[]`)
    return data
}
export const setTimeline = (value: Timeline) => {
    localStorage.setItem("timeline", JSON.stringify(value))
}

export const getSupportInformation = localStorage.getItem("supportInformation") || ""
export const setSupportInformation = (value: string) => {
    localStorage.setItem("supportInformation", value)
}


export const clearAll = () => {
    localStorage.removeItem("title")
    localStorage.removeItem("status")
    localStorage.removeItem("authors")
    localStorage.removeItem("summary")
    localStorage.removeItem("impact")
    localStorage.removeItem("rootCauses")
    localStorage.removeItem("trigger")
    localStorage.removeItem("resolution")
    localStorage.removeItem("detection")
    localStorage.removeItem("actionItems")
    localStorage.removeItem("whatWentWell")
    localStorage.removeItem("whatWentWrong")
    localStorage.removeItem("whereWeGotLucky")
    localStorage.removeItem("timeline")
    localStorage.removeItem("supportInformation")
}