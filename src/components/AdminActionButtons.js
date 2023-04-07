import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"


export default function ActionButtons(props) {
    const {productId, isActive} = props
  return (
    <div className="d-flex flex-column">
        <Button as={Link} to={`/admin-view-product/${productId}`}  size='sm' variant="primary mb-1 small-font">VIEW</Button>
        <Button as={Link} to={`/admin-update-product/${productId}`} size='sm' variant="warning mb-1 small-font">UPDATE</Button>
        {(isActive) ?

            <Button as={Link} to={`/admin-archive-product/${productId}`} size='sm' variant="danger mb-1 small-font">ARCHIVE</Button>
        :

            <Button as={Link} to={`/admin-activate-product/${productId}`} size='sm' variant="success mb-1 small-font">ACTIVATE</Button>

        }
    </div>
  )
}
