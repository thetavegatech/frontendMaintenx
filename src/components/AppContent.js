// import React, { Suspense } from 'react'
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import PropTypes from 'prop-types' // Import PropTypes
// import { CContainer, CSpinner } from '@coreui/react'
// import routes from '../routes'
// import { useSelector } from 'react-redux'

// const IsAuthenticated = () => {
//   const isAuthenticated = useSelector((state) => !!state.auth.userInfo?.name)
//   return isAuthenticated
// }

// const AppContent = () => {
//   const location = useLocation()

//   return (
//     <CContainer lg>
//       <Suspense fallback={<CSpinner color="primary" />}>
//         <Routes>
//           {routes.map(
//             (route, idx) =>
//               route.element && (
//                 <Route
//                   key={idx}
//                   path={route.path}
//                   element={<ConditionalElement element={route.element} />}
//                 />
//               ),
//           )}
//           <Route
//             path="/"
//             element={<Navigate to="/login" replace />}
//             shouldNavigate={() => location.pathname !== '/login'}
//           />
//         </Routes>
//       </Suspense>
//     </CContainer>
//   )
// }

// const ConditionalElement = ({ element: Element }) => {
//   const isAuthenticated = IsAuthenticated()

//   return isAuthenticated ? <Element /> : <Navigate to="/login" replace />
// }

// // Add PropTypes validation for the ConditionalElement component
// ConditionalElement.propTypes = {
//   element: PropTypes.elementType.isRequired,
// }

// export default React.memo(AppContent)

import React, { Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
import { useSelector } from 'react-redux'

const IsAuthenticated = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.userInfo?.name)
  return isAuthenticated
}

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map(
            (route, idx) =>
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={<ConditionalRouteElement route={route} />}
                />
              ),
          )}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

const ConditionalRouteElement = ({ route }) => {
  const isAuthenticated = IsAuthenticated()
  const location = useLocation() // Use useLocation hook

  if (isAuthenticated || location.pathname === '/login') {
    return <route.element />
  } else {
    return <Navigate to="/login" replace />
  }
}

ConditionalRouteElement.propTypes = {
  route: PropTypes.shape({
    path: PropTypes.string.isRequired,
    element: PropTypes.elementType.isRequired,
  }).isRequired,
}

export default React.memo(AppContent)
