import { createContext } from 'react'
import { UserDetail } from '../utils/types'

interface ProfileCtxType {
  profile?: UserDetail
  setProfile?: React.Dispatch<React.SetStateAction<UserDetail>>
}

const defaultContext: ProfileCtxType = {
  profile: {},
}

export const ProfileCtx = createContext<ProfileCtxType>(defaultContext)
