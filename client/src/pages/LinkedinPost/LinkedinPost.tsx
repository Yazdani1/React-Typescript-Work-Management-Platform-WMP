import { useState, useEffect } from 'react';

import PageLayout from '../../Pagelayout/PageLayout';
import { getOnlineStore } from '../../API';
import CardLayout from '../../components/CardLayout';

const LinkedinPost = () => {
  /****************************************/
  /**  Load online store  *****************/
  /****************************************/

  const [onlineStoreData, setOnlineStoreData] = useState<any>([]);

  const loadOnlineStore = async () => {
    try {
      const res = await getOnlineStore();

      if (res) {
        setOnlineStoreData(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOnlineStore();
  }, []);

  return (
    <PageLayout>
      {onlineStoreData &&
        onlineStoreData.map((item: any) => (
          <CardLayout backgroun_color="white">
            <h6>{item.title}</h6>
            <p>{item.des}</p>
            <h6>{item.price}</h6>
            <div>
              {item.photo.slice(0, 2).map((p: any) => (
                <span style={{ margin: '10px' }}>
                  <img src={p} height="200px" width="200px" />
                </span>
              ))}
            </div>
            {item.photo.length > 3 && (
              <span style={{ margin: '10px' }}>
                <button className="btn btn-primary">View {item.photo.length - 3} more photos</button>
              </span>
            )}
          </CardLayout>
        ))}
    </PageLayout>
  );
};

export default LinkedinPost;
