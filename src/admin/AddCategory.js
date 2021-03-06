import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    // Destructure user and token from localstorage

    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }


    const clickSubmit = (e) => {
        e.preventDefault();
        setError('')
        setSuccess(false)

        // Make Request to API to create category
        // Sending category name as JSON payload
        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setError(true)
                }
                else {
                    setError('')
                    setSuccess(true)
                }
            })


    }

    const newCategoryForm = () => {
        return (
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="text-muted mb-2">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
                </div>
                <button className="btn btn-outline-primary mt-3">
                    Create Category
                </button>
            </form>
        )
    }

    const showSuccess = () => {
        if (success) {
            return (
                <h3 className="text-success">{name} is created</h3>
            )
        }
    }

    // The error you get when u try to create a category is that it is not unique
    const showError = () => {
        if (error) {
            return (
                <h3 className="text-danger">Category should be unique</h3>
            )
        }
    }

    const goBack = () => {
        return (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
        </div>
        )
    }

    return (
        <Layout title="Add New Category" description={`Add a new category below.`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )

}

export default AddCategory;