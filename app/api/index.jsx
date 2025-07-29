import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ApiTestingScreen = () => {
  const testApi = async () => {
    // Get token
    const tokenResponse = await fetch('https://nirs.trinamixsensing.com/api/general/oauth/v2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.EXPO_PUBLIC_TESTING_API_CLIENT_ID,
        client_secret: process.env.EXPO_PUBLIC_TESTING_API_CLIENT_SECRET
      })
    });
    
    const tokenResults = await tokenResponse.json();
    console.log(tokenResults);
    
    const accessToken = tokenResults.access_token;
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Api-Version': '11.0',
      'accept': '*/*',
      'Content-Type': 'application/json'
    };

    // Check token validity
    const userResponse = await fetch('https://nirs.trinamixsensing.com/api/enduser/userSignUp', { headers });
    console.log(userResponse);

    const campaignsResponse = await fetch('https://nirs.trinamixsensing.com/api/enduser/campaign', { headers });
    const campaigns = await campaignsResponse.json();
    console.log(campaigns);

    const measurementsResponse = await fetch('https://nirs.trinamixsensing.com/api/organization/dataScience/measurements?PageNumber=1&PageSize=300', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        after: '2025-06-12T23:23:59.999Z',
        before: '2025-06-30T23:23:59.999Z'
      })
    });
    const measurements = await measurementsResponse.json();
    console.log(measurements);    
  }

  return (
    <View style={styles.container}>
      <Text>!!!API TESTING!!!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={testApi}
      >
        <Text style={styles.buttonText}>Try oauth2.0</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ApiTestingScreen;