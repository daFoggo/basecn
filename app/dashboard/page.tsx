"use client";

import { redirect } from "next/navigation"

const DashboardPage = () => {
    return (
        redirect('/dashboard/overview')
    )
}

export default DashboardPage