import { getToken } from "../auth/connection"

const baseUrl = "https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/SofiaApp@NETORGFT9354170.onmicrosoft.com"

export const getAppoimentsbyEmail = async (req, res)=>{
    console.log(req.params);
    const userEmail = req.params.email

    const accessToken = await getToken();

    const endpointuser = `${baseUrl}/appointments?$select=serviceName,duration,startDateTime,endDateTime,customers`
    console.log(endpointuser)
    const response = await fetch(endpointuser, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.ok) {
        const data = await response.json();
        const appointments = data.value
        const filteredAp = appointments.filter(ap =>{
            return ap.customers.some(cus=>cus.emailAddress.toLowerCase() === userEmail.toLowerCase())
        })
        res.json(filteredAp)

    } else {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}

export const getStaffMemebers = async (req, res)=>{
    const accessToken = await getToken();
    //f46221f1-d4df-4bf1-8a17-553e734e74e5
    const endpointuser = `${baseUrl}/staffMembers`
    const response = await fetch(endpointuser, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.ok) {
        const data = await response.json();
        const staff = data.value
        const filteredStaff = staff.filter((user)=>user.role === "guest")
        console.log(filteredStaff)
        res.json(staff)
    } else {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}

export const getStaffSchedule= async (req, res)=>{
    console.log(req.body)
    const {user, startDay, endDay} = req.body
    const accessToken = await getToken();
    //f46221f1-d4df-4bf1-8a17-553e734e74e5
    const endpointuser = `${baseUrl}/getStaffAvailability`
    const response = await fetch(endpointuser, {
        method:"POST",
        body: JSON.stringify({
            "staffIds": [
                user
            ],
            "startDateTime": {
                "dateTime": startDay,
                "timeZone": "SA Pacific Standard Time"
            },
            "endDateTime": {
                "dateTime": endDay,
                "timeZone": "SA Pacific Standard Time"
            }
        }),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        }
    })

    if (response.ok) {
        const data = await response.json();
        const schedule = data.value[0].availabilityItems
        console.log(schedule)
        const aviable = schedule.filter(x=>x.status === "available")
        // const availability = data.value.availabilityItems
        // const filtered = availability.filter(a=>a.status!=="outOfOffice")
        // const staff = data.value
        // const filteredStaff = staff.filter((user)=>!user.emailAddress.includes("autosuficienciaemocional"))
        // console.log(filteredStaff)
        // res.json(filteredStaff)
        
        console.log(aviable)
        res.json(aviable)

    } else {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}

export const getAppoimentsAdmins = async (req, res)=>{
    const {idStaff} = req.body
    const accessToken = await getToken();
    //f46221f1-d4df-4bf1-8a17-553e734e74e5
    const endpointuser = `${baseUrl}/appointments?$select=serviceName,duration,startDateTime,endDateTime,customers,staffMemberIds`
    console.log(endpointuser)
    const response = await fetch(endpointuser, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.ok) {
        const data = await response.json();
        const appointments = data.value
        const filteredAp = appointments.filter(ap => ap.staffMemberIds.includes(idStaff))
        // console.log(filteredAp)
        res.json(filteredAp)

    } else {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}

export const testing= async (req, res)=>{
    console.log(req.body)
    const {user, startDay, endDay} = req.body
    const accessToken = await getToken();
    //f46221f1-d4df-4bf1-8a17-553e734e74e5
    const endpointuser = `${baseUrl}/appointments`
    const response = await fetch(endpointuser, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.ok) {
        const data = await response.json();
        const appointments = data.value
        res.json(appointments)

    } else {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}