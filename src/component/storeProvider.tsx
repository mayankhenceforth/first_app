'use client'
 
import React from "react"
import { Provider } from "react-redux"
import { createStore } from "@/lib/store/store"
 
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={createStore()}>{children}</Provider>
}