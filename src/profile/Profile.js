import { useEffect, useState } from "react"
import { createSubscription, deleteSubscription, getSubscriptions, getUser } from "../APIManager"
import { Link, useParams } from "react-router-dom"


export const Profile = () => {

    const [user, setUser] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [filteredSubscriptions, setFilteredSubscriptions] = useState([])

    const rareUserId = localStorage.getItem("auth_token");
    const rareUser = JSON.parse(rareUserId);
    const { userId } = useParams()

    const profileType = user.is_admin ? "Admin" : "Author"

    useEffect(() => {
        getUser(userId).then((selectedUser) => {
            setUser(selectedUser)
        })
    }, [])

    useEffect(() => {
        getSubscriptions().then((allSubscriptions) => {
            setSubscriptions(allSubscriptions)
        })
    }, [])

    useEffect(() => {
        const mySubscriptions = subscriptions.filter((subscription) => { return subscription.follower_id === rareUser })
        setFilteredSubscriptions(mySubscriptions)
    }, [subscriptions])

    const getCurrentDate = () => {
        const currentDate = new Date()
        const formattedDate = currentDate.toDateString().substring(4)
        return formattedDate
    }

    const currentSubscription = filteredSubscriptions.find((subscription) => subscription.author_id === parseInt(userId))

    const subscribe = async () => {
        const newSubscription = {
            follower_id: rareUser,
            author_id: parseInt(userId),
            created_on: getCurrentDate()
        }
        await createSubscription(newSubscription)
        getSubscriptions().then((allSubscriptions) => {
            setSubscriptions(allSubscriptions)
        })
    }

    const unsubscribe = async () => {
        await deleteSubscription(currentSubscription.id);
        const updatedSubscriptions = await getSubscriptions();
        getSubscriptions().then((allSubscriptions) => {
            setSubscriptions(allSubscriptions)
        })
    }

    return (
        <div className="container">
            {user.profile_image_url && (
                <img
                    src={user.profile_image_url}
                    alt="Post Image"
                />
            )}
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.created_on}</p>
            <p>{profileType}</p>
            <p>Clickable Article Count that takes you to post by author view</p>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            {
                currentSubscription
                    ? <button onClick={() => unsubscribe(currentSubscription.id)}>Unsubscribe</button>
                    : <Link to="/"><button onClick={() => subscribe()}>Subscribe</button></Link>
            }
            <p>{user.bio}</p>
        </div>
    )
}