import { client } from "../auth/connection.js"
import moment from "moment";

const baseUrl = "https://graph.microsoft.com/v1.0/solutions/bookingBusinesses/"
const businessId = process.env.BUSSINESS_ID

export const getAppoimentsbyEmail = async (req, res) => {
    console.log(req.params);
    const userEmail = req.params.email
    const startTime = moment().startOf("M")
    const endTime = moment().add(2, "M").endOf("M")
    console.log(businessId)
    try {
        const users = await client.api(`/solutions/bookingBusinesses/${businessId}/appointments`)
            .select("serviceName,duration,startDateTime,endDateTime,customers,staffMemberIds")
            .get();

        const data = users.value

        const filteredAp = data.filter(ap => {
            return ap.customers.some(cus => cus.emailAddress.toLowerCase() === userEmail.toLowerCase())
        })
        const apFiltered = filteredAp.filter(ap =>
            new Date(ap.startDateTime.dateTime) >= new Date(startTime) &&
            new Date(ap.endDateTime.dateTime) <= new Date(endTime)
        )
        console.log(apFiltered)
        res.json(apFiltered)


    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getStaffMemebers = async (req, res) => {
    try {
        const users = await client.api(`/solutions/bookingBusinesses/${businessId}/staffMembers`)
            .get();

        const data = users.value

        res.json(data)

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getStaffMemebersById = async (req, res) => {
    const accessToken = await getToken();
    const { id } = req.params

    try {
        const data = await client.api(`/solutions/bookingBusinesses/${businessId}/staffMembers/${id}`)
            .get();

        const staffMemeber = { name: data.displayName, email: data.emailAddress }
        console.log(staffMemeber)
        res.json(staffMemeber)


    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getStaffSchedule = async (req, res) => {
    console.log(req.body)
    const { user, startDay, endDay } = req.body

    const staffAvailabilityItem = {
        staffIds: [
            user
        ],
        startDateTime: {
            "dateTime": startDay,
                "timeZone": "SA Pacific Standard Time"
        },
        endDateTime: {
            "dateTime": endDay,
                        "timeZone": "SA Pacific Standard Time"
        }
    };

    try {
        const data = await client.api(`/solutions/bookingBusinesses/${businessId}/getStaffAvailability`)
            .post(staffAvailabilityItem);

        const schedule = data.value[0].availabilityItems
        console.log(schedule)
        const aviable = schedule.filter(x => x.status === "available")

        console.log(aviable)
        res.json(aviable)

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getAppoimentsAdmins = async (req, res) => {
    const { idStaff } = req.body

    try {
        const data = await client.api(`/solutions/bookingBusinesses/${businessId}/appointments`)
        .select("serviceName,duration,startDateTime,endDateTime,customers,staffMemberIds")
        .get();

            const appointments = data.value
                const filteredAp = appointments.filter(ap => ap.staffMemberIds.includes(idStaff))
                res.json(filteredAp)

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getStaffIdByName = async (req, res) => {
    const userEmail = req.params.email

    try {
        const data = await client.api(`/solutions/bookingBusinesses/${businessId}/staffMembers`)
        .get();

            const appointments = data.value
        const filteredAp = appointments.filter(ap => ap.emailAddress.toLowerCase() === userEmail.toLowerCase())

        res.json({ idStaff: filteredAp[0].id })

    } catch (error) {
        console.log(error);
        return null;
    }

    // const accessToken = await getToken();
    // //f46221f1-d4df-4bf1-8a17-553e734e74e5
    // const endpointuser = `${baseUrl}/staffMembers`
    // const response = await fetch(endpointuser, {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`
    //     }
    // })

    // if (response.ok) {
    //     const data = await response.json();
    //     const appointments = data.value
    //     const filteredAp = appointments.filter(ap => ap.emailAddress.toLowerCase() === userEmail.toLowerCase())

    //     res.json({ idStaff: filteredAp[0].id })

    // } else {
    //     console.log(`Error: ${response.status} ${response.statusText}`);
    //     return null;
    // }
}

export const getAppoimentsForWeek = async (req, res) => {
    console.log(req.params);
    const userEmail = req.params.email
    const startTime = moment().startOf("W")
    const endTime = moment().endOf("W")

    const accessToken = await getToken();

    // const endpointuser = `${baseUrl}/appointments?$filter=start/dateTime ge 2023-04-01T00:00:00Z and end/dateTime le 2023-04-30T23:59:59Z&$select=serviceName,duration,startDateTime,endDateTime,customers,staffMemberIds`
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
        const filteredAp = appointments.filter(ap => {
            return ap.customers.some(cus => cus.emailAddress.toLowerCase() === userEmail.toLowerCase())
        })
        const apFiltered = filteredAp.filter(ap =>
            new Date(ap.startDateTime.dateTime) >= new Date(startTime) &&
            new Date(ap.endDateTime.dateTime) <= new Date(endTime)
        )
        console.log(apFiltered)
        res.json(apFiltered)

    } else {
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}

export const testing = async (req, res) => {
    const accessToken = await getToken();

    // const endpointuser = `${baseUrl}/appointments?$filter=start/dateTime ge 2023-04-01T00:00:00Z and end/dateTime le 2023-04-30T23:59:59Z&$select=serviceName,duration,startDateTime,endDateTime,customers,staffMemberIds`
    const endpointuser = `${baseUrl}/calendarView?start=2023-04-01T00:00:00Z&end=2023-05-12T00:00:00Z`
    console.log(endpointuser)
    const response = await fetch(endpointuser, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        res.json(data)

    } else {
        console.log(response)
        console.log(`Error: ${response.status} ${response.statusText}`);
        return null;
    }
}