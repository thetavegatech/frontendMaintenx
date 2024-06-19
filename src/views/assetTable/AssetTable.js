import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { CTable, CTableHead, CButton } from '@coreui/react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import './asset.css'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { Grid } from '@material-ui/core'

const AssetTable = () => {
  const [assets, setAssets] = useState([])
  const [filteredAssets, setFilteredAssets] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [showQrReader, setShowQrReader] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('https://backendmaintenx.onrender.com/api/assets')
      .then((response) => {
        const assetsData = Array.isArray(response.data) ? response.data : [response.data]
        setAssets(assetsData)
        setFilteredAssets(assetsData)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
        setLoading(false)
      })
  }, [])

  const deleteData = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?')
    if (isConfirmed) {
      axios
        .delete(`https://backendmaintenx.onrender.com/api/assets/${id}`)
        .then(() => {
          const newAssets = assets.filter((asset) => asset._id !== id)
          setAssets(newAssets)
          setFilteredAssets(newAssets)
          setMessage('Data successfully deleted!')
          setTimeout(() => {
            setMessage('')
          }, 2000)
        })
        .catch((error) => {
          console.error('Error deleting data:', error)
          setMessage('Error deleting data. Please try again.')
          setTimeout(() => {
            setMessage('')
          }, 2000)
        })
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase()
    const filteredAssets = assets.filter((asset) => {
      const locationLower = (asset.Location || '').toLowerCase()
      const assetNameLower = (asset.AssetName || '').toLowerCase()
      return locationLower.includes(query) || assetNameLower.includes(query)
    })
    setFilteredAssets(filteredAssets)
    setSearchQuery(query)
  }

  const handleResult = (result, error) => {
    if (!!result) {
      console.log('QR Code Result:', result.text)
      navigate(`/assetRecord/${result.text}`)
      setShowQrReader(false)
    }

    if (!!error) {
      console.info(error)
    }
  }

  return (
    <div className="container">
      <NavLink to="/assetForm">
        <CButton
          className="mb-2"
          style={{ marginTop: '5px', margin: '10px', backgroundColor: '#000026' }}
        >
          Add New
        </CButton>
      </NavLink>
      {/* <CButton
        style={{ marginTop: '5px', margin: '10px', backgroundColor: '#000026' }}
        className="mb-2"
        onClick={() => setShowQrReader(!showQrReader)}
      >
        {showQrReader ? 'Close QR Scanner' : 'Scan QR Code'}
      </CButton>
      {showQrReader && (
        <div style={{ width: '100%' }}>
          <QrReader
            onResult={handleResult}
            constraints={{ facingMode: 'environment' }}
            style={{ width: '100%' }}
          />
        </div>
      )} */}
      <label htmlFor="searchTask" style={{ marginLeft: '60%' }}>
        <span role="img" aria-label="search-icon"></span>
      </label>
      <input
        placeholder="Search by Asset/Location"
        style={{
          marginBottom: '10px',
          padding: '8px',
          border: '1px solid ',
          borderRadius: '4px',
          transition: 'border-color 0.3s ease-in-out, background-color 0.3s ease-in-out',
        }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="table-container">
        <Table className="custom-table">
          <Thead>
            <Tr>
              <Th>Sr No</Th>
              <Th>Machine Name</Th>
              <Th>Machine Type</Th>
              <Th>Location</Th>
              <Th>QR Code</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan="8" style={{ textAlign: 'center' }}>
                  <p>Loading...</p>
                </Td>
              </Tr>
            ) : (
              <>
                {message && (
                  <Tr>
                    <Td
                      colSpan="8"
                      style={{ textAlign: 'center', fontStyle: 'italic', color: 'red' }}
                    >
                      {message}
                    </Td>
                  </Tr>
                )}
                {filteredAssets.map((asset, index) => (
                  <Tr key={asset._id}>
                    <Td>{index + 1}</Td>
                    <Td>{asset.AssetName}</Td>
                    <Td>{asset.MachineType}</Td>
                    <Td>{asset.Location}</Td>
                    <Td>
                      {asset.qrCode && (
                        <img src={asset.qrCode} alt="QR Code" width={50} height={50} />
                      )}
                    </Td>
                    <Td>
                      <NavLink to={`/editasset/${asset._id}`} style={{ color: '#000080' }}>
                        <FaEdit />
                      </NavLink>
                    </Td>
                    <Td>
                      <button
                        className="btn"
                        onClick={() => deleteData(asset._id)}
                        style={{ color: 'red' }}
                      >
                        <MdDelete />
                      </button>
                    </Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  )
}

export default AssetTable
