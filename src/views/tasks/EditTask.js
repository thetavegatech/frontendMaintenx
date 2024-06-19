import React, { useEffect, useState } from 'react'
// import editForm from './css/editform.css';
// import { Form, FormGroup, Label, Input, Button, Container, Col } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function EditForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [AssetName, setAssetName] = useState('')
  const [TaskName, setTaskName] = useState('')
  const [TaskDescription, setTaskDescription] = useState('')
  const [AssetCategory, setAssetCategory] = useState('') // Default to false
  const [Location, setLocation] = useState('') // Default to false
  const [ManufacturersName, setManufacturersName] = useState('')
  const [ManufacturersAddress, setManufacturersAddress] = useState('')
  const [ManufacturersContactNo, setManufacturersContactNo] = useState('')
  const [SupplierVendorInformation, setSupplierVendorInformation] = useState('')
  const [CurrentOwner, setCurrentOwner] = useState('')
  const [DepartmentResponsible, setDepartmentResponsible] = useState('')
  const [LocationDepartment, setLocationDepartment] = useState('')
  const [PhysicalLocation, setPhysicalLocation] = useState('')
  const [CurrentStatus, setCurrentStatus] = useState('')
  const [ExpectedUsefulLife, setExpectedUsefulLife] = useState('')
  const [DateofLastMaintenance, setDateofLastMaintenance] = useState('')
  const [DetailsofMaintenanceActivities, setDetailsofMaintenanceActivities] = useState('')
  const [ScheduledMaintenanceDatesandIntervals, setScheduledMaintenanceDatesandIntervals] =
    useState('')
  const [ManufacturersEmail, setManufacturersEmail] = useState('')
  const [status, setstatus] = useState('')
  const [ModelNumber, setModelNumber] = useState('')
  const [SerialNumber, setSerialNumber] = useState('')
  const [PurchaseCost, setPurchaseCost] = useState('')
  const [PurchaseDate, setPurchaseDate] = useState('')
  const [WarrantyStartDate, setWarrantyStartDate] = useState('')
  const [WarrantyEndDate, seWarrantyEndDate] = useState('')
  const [AcquisitionMethod, setAcquisitionMethod] = useState('')
  const [WarrantyProviderManufacturerContact, setWarrantyProviderManufacturerContact] = useState('')
  const [WarrantyTermsandConditions, setWarrantyTermsandConditions] = useState('')
  const [PMDetails, setPMDetails] = useState('')
  const [Image, setImage] = useState('')
  const [startDate, setstartDate] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  function convertToBse64(e) {
    console.log(e)
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      console.log(reader.result) // base64encoded string
      setImage(reader.result)
    }
    reader.onerror = (err) => {
      console.log(err)
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.1.4:5000/getId/${id}`)
      console.log(response)
      setAssetName(response.data.AssetName)
      setTaskName(response.data.TaskName)
      setTaskDescription(response.data.TaskDescription)
      setAssetCategory(response.data.AssetCategory)
      setLocation(response.data.Location)
      setManufacturersName(response.data.ManufacturersName)
      setManufacturersAddress(response.data.ManufacturersAddress)
      setManufacturersContactNo(response.data.ManufacturersContactNo)
      setSupplierVendorInformation(response.data.SupplierVendorInformation)
      setCurrentOwner(response.data.CurrentOwner)
      setDepartmentResponsible(response.data.DepartmentResponsible)
      setLocationDepartment(response.data.LocationDepartment)
      setPhysicalLocation(response.data.PhysicalLocation)
      setCurrentStatus(response.data.CurrentStatus)
      setExpectedUsefulLife(response.data.ExpectedUsefulLife)
      setDateofLastMaintenance(response.data.DateofLastMaintenance)
      setDetailsofMaintenanceActivities(response.data.DetailsofMaintenanceActivities)
      setScheduledMaintenanceDatesandIntervals(response.data.ScheduledMaintenanceDatesandIntervals)
      setManufacturersEmail(response.data.ManufacturersEmail)
      setModelNumber(response.data.ModelNumber)
      setSerialNumber(response.data.SerialNumber)
      setPurchaseCost(response.data.PurchaseCost)
      setPurchaseDate(response.data.PurchaseDate)
      setWarrantyStartDate(response.data.WarrantyStartDate)
      setAcquisitionMethod(response.data.AcquisitionMethod)
      seWarrantyEndDate(response.data.WarrantyEndDate)
      setWarrantyProviderManufacturerContact(response.data.WarrantyProviderManufacturerContact)
      setWarrantyTermsandConditions(response.data.WarrantyTermsandConditions)
      setPMDetails(response.data.PMDetails)
      setImage(response.data.Image)
      setstartDate(formatDate(response.data.startDate))
      // setnextDate(response.data.nextDate)
      setstatus(response.data.status)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const Update = (e) => {
    e.preventDefault()
    axios
      .put(`http://192.168.1.4:5000/updateRecord/${id}`, {
        AssetName,
        TaskName,
        TaskDescription,
        AssetCategory,
        Location,
        ManufacturersName,
        ManufacturersAddress,
        ManufacturersContactNo,
        ManufacturersEmail,
        ModelNumber,
        SerialNumber,
        PurchaseDate,
        WarrantyStartDate,
        WarrantyEndDate,
        PurchaseCost,
        AcquisitionMethod,
        WarrantyProviderManufacturerContact,
        WarrantyTermsandConditions,
        SupplierVendorInformation,
        CurrentOwner,
        DepartmentResponsible,
        LocationDepartment,
        PhysicalLocation,
        CurrentStatus,
        ExpectedUsefulLife,
        DateofLastMaintenance,
        DetailsofMaintenanceActivities,
        ScheduledMaintenanceDatesandIntervals,
        PMDetails,
        status,
        Image,
        startDate,
        // nextDate,
      })
      .then((result) => {
        console.log(result)
        setAssetName('')
        setTaskName('')
        setTaskDescription('')
        setAssetCategory('')
        setLocation('')
        setstartDate('')
        setScheduledMaintenanceDatesandIntervals('')
        // setnextDate('')
        setstatus('')
        setImage('')

        // Assuming you have a navigate function or useHistory from react-router-dom
        // Navigate back to the previous page
        navigate(-1)
      })
      .catch((err) => console.log(err))
  }
  // Create a function to format the date
  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString)
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  return (
    <>
      <div
        className="tab-content1"
        style={{
          border: '2px solid #ccc',
          backgroundColor: '',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
        }}
      >
        {/* Step 1: Asset Identification */}
        <div>
          <form onSubmit={Update}>
            <div className="form-group"></div>
            {/* <div className="form-group">
              <label htmlFor="assetName">Asset Name:</label>
              <input
                type="text"
                className="form-control"
                name="AssetName"
                id="assetName"
                style={{ width: '80%' }}
                value={AssetName}
                onChange={(e) => setAssetName(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="taskName">Task Name:</label>
              <input
                disabled
                type="text"
                className="form-control"
                name="taskName"
                id="taskName"
                // style={{ width: '100%' }}
                value={TaskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="assetDescription">Description:</label>
              <textarea
                className="form-control"
                disabled
                // style={{ width: '80%' }}
                id="taskDescription"
                defaultValue={''}
                name="TaskDescription"
                value={TaskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start From :</label>
              <input
                type="text" // Change input type to text
                className="form-control"
                id="startDate"
                // style={{ width: '80%' }}
                name="startDate"
                value={startDate}
                disabled // to make it non-editable
              />
            </div>
            <div className="form-group">
              <label htmlFor="scheduledMaintenance">
                Scheduled Maintenance Dates and Intervals:
              </label>
              <select
                disabled
                className="form-control"
                // style={{ width: '80%' }}
                id="scheduledMaintenance"
                name="ScheduledMaintenanceDatesandIntervals"
                value={ScheduledMaintenanceDatesandIntervals}
                onChange={(e) => setScheduledMaintenanceDatesandIntervals(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="fifteen days">Fifteen Days</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half year">Half Year</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            {/* <div className="form-group">
              <label htmlFor="nextDate">Next Date of Maintenance :</label>
              <input
                style={{ width: '80%' }}
                disabled
                type="date"
                className="form-control"
                id="nextDate"
                value={nextDate}
                readOnly // to make it non-editable
                onChange={(e) => setnextDate(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                // style={{ width: '80%' }}
                required
                id="status"
                name="status"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                {/* <option value="open">Open</option> */}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="attachment">Attachment:</label>
              <input
                type="file"
                className="form-control col-sm-6"
                onChange={convertToBse64}
              ></input>
            </div>
            <button className="btn btn-primary mb-2" style={{ margin: '10px' }} type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
