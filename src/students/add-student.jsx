import { BackButton } from "../components/shared/buttons.jsx";
import { useNavigate } from "react-router-dom";

export function AddStudent() {
    const navigate = useNavigate();

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <div className="card rounded-3">
                    <div className="card-header">
                        <h1>Add Student</h1>
                    </div>
                    <div className="card-body p-3">
                        <div id="addStudentForm">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                navigate(-1);
                            }}>
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="netid">Net ID:</label>
                                        <input className="form-control" type="text" id="netid" name="netid" />
                                    </div>
                    
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="name">Name:</label>
                                        <input className="form-control" type="text" id="name" name="name" />
                                    </div>  
                                </div>
                                
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="inputClass" className="form-label">Class</label>
                                        <select id="inputClass" className="form-select">
                                        <option defaultValue>Choose...</option>
                                        <option>CS 111: Introduction to Computer Science</option>
                                        </select>
                                    </div>
                        
                                    <div className="col-12 col-md-6">
                                        <label htmlFor="profile-pic" className="form-label">Picture:</label>
                                        <input className="form-control" type="file" id="profile-pic" name="profile-pic" accept=".jpg,.png" />
                                    </div>
                                </div>
                                
                                <div className="btn-container centered">
                                    <button className="btn btn-success" type="submit">Add</button>
                                    <BackButton btnStyle="btn btn-danger" btnText="Cancel" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}