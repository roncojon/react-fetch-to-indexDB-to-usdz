import React, { useEffect, useState } from 'react';
import useIndexedDB from './IndexDB/useIndexedDB';
import { downloadModelAsBase64, downloadModelAsBlob } from './IndexDB/utilsIndexDB';
import Viewer3DThree from './Viewer3D/Viewer3DThree';
import Viewer3DModelViewer from './Viewer3D/Viewer3DModelViewer';

const UrlProvider = ({ url }: { url: string }) => {
    const { db, getObject, addObject, /* deleteObject */ } = useIndexedDB();
    const [modelData, setModelData] = useState<string | null>(null);
///// 
const [testUrl, setTestUrl] = useState<Blob | null>(null);
////

    useEffect(() => {
        const fetchData = async () => {
            try {
                // deleteObject('/chair_swan.usdz')
                // Check if the object with the given URL exists in the DB
                const existingModel = await getObject(url);
                console.log('existingModel', existingModel)
                if (existingModel) {
                    // If it exists, use the data from the DB
                    setModelData(URL.createObjectURL(existingModel.data));
                    //
                    setTestUrl(existingModel.data);
                    console.log(`Model from ${url} found in IndexedDB`);
                } else {
                    // If it doesn't exist, download and save it
                    const fileAsBlob = await downloadModelAsBlob(url);
                    await addObject(url, fileAsBlob);
                    await setModelData(URL.createObjectURL(fileAsBlob));
                    //
                    setTestUrl(fileAsBlob);
                    console.log(`Model from ${url} saved to IndexedDB`);
                }
            } catch (error) {
                console.error('Error handling the 3D model:', error);
            }
        };
        if (db)
            fetchData();
    }, [db/* url, getObject, addObject */]);

    useEffect(() => {
        console.log('modelData', modelData)
    }, [modelData])


    
    return (
        <>
            {
                modelData &&
                <>
                    <div className="card">
                        <Viewer3DThree filePath={modelData ? modelData : ''} />
                        {/* <Viewer3DThree filePath={testUrl} /> */}
                    </div>
                    {/* <div className="card">
                        <Viewer3DModelViewer url={modelData ? modelData : ''} />
                    </div> */}
                </>
            }
        </>
    );
};

export default UrlProvider;
