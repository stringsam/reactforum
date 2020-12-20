import Grid from '@material-ui/core/Grid'
import React, { FC, useContext, useEffect, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { ProfileCtx } from '../components/ProfileCtx'
import { threadsCollection } from '../utils/firebase'
import { Thread } from '../utils/types'
import { Thread as ThreadComponent } from '../components/Thread'

const Profile: FC = () => {
  const [threads, setThread] = useState<Thread[]>([])

  const profileCtx = useContext(ProfileCtx)

  useEffect(() => {
    // Call .onSnapshot() to listen to changes
    const unsubscribe = threadsCollection
      .where('by.uid', '==', profileCtx.profile?.uid || '')
      .orderBy('date', 'desc')
      .onSnapshot(
        (snapshot) => {
          // Access .docs property of snapshot
          setThread(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                by: doc.data().by,
                title: doc.data().title,
                date: doc.data().date,
              }
            }),
          )
        },
        (err) => console.error(err),
      )

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe?.()
  }, [profileCtx])

  return (
    <Grid container wrap="wrap" spacing={3}>
      <Grid xs={12} item>
        <ProfileCard />
      </Grid>
      {threads.map((r, i) => (
        <Grid key={i} xs={12} item>
          <ThreadComponent thread={r} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Profile
