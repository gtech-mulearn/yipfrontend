export interface commonViewProps {
    pre_registrations: string
    pre_registration: string
    vos: string
    group_formation: string
    idea_submission: string
}

export interface zoneViewProps extends commonViewProps {
    name: string
    zone: string
}
export interface districtViewProps extends zoneViewProps {
    district: string
    pre_registration: string
    zone: string
}
export interface AssignViewProps extends districtViewProps {
    district: string
}
export interface CampusViewProps extends commonViewProps {
    institute: string
    district: string
    id: string
    intern: string
    zone: string
}
export interface InternViewProps extends zoneViewProps {
    district: string[]
    districtName: string
}

export const views = [
    { id: "0", name: "Intern" },
    { id: "1", name: "Campus" },
    { id: "2", name: "District" },
    { id: "3", name: "Zone" },
    { id: "4", name: "State" },
]