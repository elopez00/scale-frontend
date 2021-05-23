import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Loading from './src/components/loading'
import Dashboard from './src/components/dashboard'
import Auth from './src/components/auth'

export default function App() {
  const [page, setPage] = useState("loading")

  /**
   * This function will check the authentication status of the application. If the status
   * is falsey, then that means the user will be redirected to loading. If the status is
   * truthy then the user will be redirected to their dashboard.
   */
  const checkAuth = async() => {
    try {
      let res = await fetch("http://scale-backend-dev.us-east-1.elasticbeanstalk.com/v0/")
      let authenticated = await res.json()
      if (authenticated.Status) {
        setPage("dashboard")
      } else {
        setPage("auth")
      }
    } catch(err) {
      console.error(err)
    }
  }

  // handles which page should be shown based on page state variable
  const showPage = () => {
    switch(page) {
      case ("dashboard"): return <Dashboard />
      case ("auth"): return <Auth />
      default: return <Loading />
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])
  
  return (
    <View style={styles.container}>
      { showPage() }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
