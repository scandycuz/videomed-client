import React from 'react';
import Box from 'components/core/Box';
import ImageBox from 'components/core/ImageBox';
import authorization from 'assets/images/authorization.png';
import noDataStorage from 'assets/images/no-data-storage.png';
import peerToPeer from 'assets/images/peer-to-peer.png';

export const Security = () => {
  return (
    <Box padding="1rem">
      <Box width="100%" paddingRight="1rem">
        <ImageBox
          src={authorization}
          alt="SSL encryption and JWT authentication"
          title="Enforced SSL encryption and JWT token authentication."
        />
      </Box>

      <Box width="100%" paddingLeft="0.5rem" paddingRight="0.5rem">
        <ImageBox
          src={noDataStorage}
          alt="no stored data."
          title="No data storage. All data exists only in the moment."
        />
      </Box>

      <Box width="100%" paddingLeft="1rem">
        <ImageBox
          src={peerToPeer}
          alt="desc"
          title="Peer to Peer connection between two users, no third parties."
        />
      </Box>
    </Box>
  )
}

export default Security;
