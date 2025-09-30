import { createContext, useContext, useEffect, useState } from "react";

import databaseService from '../services/databaseService';
import functionsService from '../services/functionsService';
import { useAuth } from './authContext';
import { useLoading } from './loadingContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [scanners, setScanners] = useState(null);
  const [fields, setFields] = useState(null);
  const [plants, setPlants] = useState(null);

  const { userAuth } = useAuth();
  const { updateLoading } = useLoading();

  const getNewSamples = async (currentScannerState) => {
    updateLoading(['newSamples'],[]);
    const fetchScanners = currentScannerState.map(scannerObj => scannerObj.scannerID)

    // Get the new samples
    const results = await functionsService.getNewSamples(fetchScanners);
    
    // Update the current information with the new samples
    const newScanners = JSON.parse(JSON.stringify(currentScannerState));
    for (const [scannerId, newSamples] of Object.entries(results.data)) {
      const scannerIdx = newScanners.findIndex(s => s.scannerID === scannerId);
      for (const sample of newSamples) {
        // Add new sample or update existing sample (since it was updated)
        const sampleIdx = newScanners[scannerIdx].samples.findIndex(s => s.sampleID === sample.sampleID);
        if (sampleIdx >= 0) {
          newScanners[scannerIdx].samples[sampleIdx] = sample;
        } else {
          newScanners[scannerIdx].samples.push(sample);
        }
      }
    }

    setScanners(newScanners);

    updateLoading([], ['newSamples']);
  };

  useEffect(() => {
    (async () => {
      if (userAuth) {
        updateLoading(['userData', 'newSamples'],[]);

        const allCurrentData = await databaseService.getInitData();

        if (allCurrentData?.error) {
          // In case of error, everything gets set to null
          setUserData(null);
          setScanners(null);
          setFields(null);
          setPlants(null);
          updateLoading([], ['userData', 'newSamples']);
        } else {
          // Store the new data in state
          setUserData({
            authID: allCurrentData[0].authID,
            id: allCurrentData[0].$id,
          });
  
          setScanners(allCurrentData[0].scanners);
          setFields(allCurrentData[0].fields);
          setPlants(allCurrentData[0].plants);

          // Get any new stuff from the trinamiX database in the background
          await getNewSamples(allCurrentData[0].scanners);

          updateLoading([],['userData']);
        }
      }
    })();
  }, [userAuth]);

  return (
    <DataContext.Provider value={{
      userData,
      scanners,
      fields,
      plants
    }}>{ children }</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);