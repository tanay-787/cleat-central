import React from 'react'
import UserProfile from './UserProfile'
import NavBar from '../shared-components/NavBar'
import Footer from '../shared-components/Footer'

export default function UserProfilePage() {
  return (
    <>
    <NavBar />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <UserProfile />
    </div>
    </>
  )
}