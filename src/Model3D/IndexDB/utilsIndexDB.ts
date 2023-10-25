export async function downloadModelAsBase64(url: string): Promise<string> {
    try {
        // Fetch the 3D model data from the provided URL
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch the 3D model');
        }

        const modelBlob = await response.blob();

        // Convert the Blob to a base64-encoded string
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                resolve(base64String);
            };
            reader.onerror = () => {
                reject('Error converting Blob to base64');
            };
            reader.readAsDataURL(modelBlob);
        });
    } catch (error) {
        console.error('Error downloading the 3D model:', error);
        throw error;
    }
}

export async function downloadModelAsBlob(url: string): Promise<Blob> {
    try {
        // Fetch the 3D model data from the provided URL
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch the 3D model');
        }
        //////
        // const arrayBuffer = await response.arrayBuffer();
        // const blob = new Blob([arrayBuffer], { type: 'model/usdz' }/* { type: 'model/usdz' } */);
        // return blob;
        //////


        // // // 
        return response.blob();

        //   const modelBlob = await response.blob();

        return modelBlob;
        // Convert the Blob to a base64-encoded string
        //   return new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //       const base64String = reader.result as string;
        //       resolve(base64String);
        //     };
        //     reader.onerror = () => {
        //       reject('Error converting Blob to base64');
        //     };
        //     reader.readAsDataURL(modelBlob);
        //   });
    } catch (error) {
        console.error('Error downloading the 3D model:', error);
        throw error;
    }
}