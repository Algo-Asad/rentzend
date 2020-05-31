import React, {useCallback, useMemo, useState} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Avatar, Button, CircularProgress, Container, CssBaseline, TextField} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useFormik} from "formik";
import {DropEvent, FileRejection, useDropzone} from "react-dropzone";
import {useMutation} from "@apollo/react-hooks";
import {SignUpFormKeys, SignUpInitialValues, SignUpSchema} from "./Home.form";
import {acceptStyle, activeStyle, baseStyle, imageItem, imgContainer, rejectStyle, useStyles} from "./Home.styles";
import TextMask from "../common/TextMask";
import {createUserMutation, uploadFileMutation} from "../../apollo/mutations";
import {useHistory} from "react-router";

const Home: React.FC = () => {
    const classes = useStyles();
    const {push} = useHistory()

    const [images, setImages] = useState<{ id: string, src: any }[]>([])
    const [complete, setComplete] = useState<boolean>(false)

    const [upload, {loading: upLoading, error: errorUpLoading}] = useMutation(uploadFileMutation)
    const [submit, {loading, error: errorSubmittingLoading}] = useMutation(createUserMutation)
    const {handleSubmit, handleChange, values, errors, setValues, isValid} = useFormik({
        initialValues: SignUpInitialValues,
        validationSchema: SignUpSchema,
        onSubmit: async variables => {
            await submit({variables});
            setComplete(true)
            push('/list')
        },
    });

    const onDrop = useCallback(
        async ([file]: any) => {
            const {data: {uploadFile: id}} = await upload({variables: {file}})
            const newId = id as never;
            setImages([...images, {id: id, src: URL.createObjectURL(file)}])
            setValues({...values, [SignUpFormKeys.Files]: [...values[SignUpFormKeys.Files], newId]})
        },
        [upload, images, setImages, setValues, values])

    const getDropText = () => {
        if (upLoading) {
            return 'Loading'
        } else if (images.length > 1) {
            return 'Good to go!'
        } else if (errors[SignUpFormKeys.Files]?.length) {
            return errors[SignUpFormKeys.Files]
        } else {
            return 'Please upload a photo of yourself and of your licence'
        }
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({onDrop, disabled: images.length > 1});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept || images.length > 1 ? acceptStyle : {}),
        ...((isDragReject || !!errors[SignUpFormKeys.Files]?.length) ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept,
        errors,
        images
    ]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                error={!!errors[SignUpFormKeys.Name]}
                                name={SignUpFormKeys.Name}
                                id={SignUpFormKeys.Name}
                                variant="outlined"
                                fullWidth
                                label={errors[SignUpFormKeys.Name] || "Full Name"}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                error={!!errors[SignUpFormKeys.Email]}
                                name={SignUpFormKeys.Email}
                                id={SignUpFormKeys.Email}
                                label={errors[SignUpFormKeys.Email] || "Email"}
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                type="address"
                                fullWidth
                                error={!!errors[SignUpFormKeys.Phone]}
                                id={SignUpFormKeys.Phone}
                                name={SignUpFormKeys.Phone}
                                autoComplete="phone"
                                label={errors[SignUpFormKeys.Phone] || 'Phone'}
                                InputProps={{
                                    inputComponent: TextMask,
                                    value: values[SignUpFormKeys.Phone],
                                    onChange: handleChange
                                }}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={errors[SignUpFormKeys.Address] || "Address"}
                                error={!!errors[SignUpFormKeys.Address]}
                                name={SignUpFormKeys.Address}
                                id={SignUpFormKeys.Address}
                                autoComplete="current-address"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label={errors[SignUpFormKeys.Zip] || "Zip Code"}
                                type="zip"
                                error={!!errors[SignUpFormKeys.Zip]}
                                name={SignUpFormKeys.Zip}
                                id={SignUpFormKeys.Zip}
                                autoComplete="current-zip"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className="container">
                                <div {...getRootProps({style: style as any})}>
                                    <input {...getInputProps()} />
                                    <p>{getDropText()}</p>
                                    <div style={imgContainer}>
                                        {images.map((image) => <img key={image.id} style={imageItem} src={image.src}/>)}
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.wrapper}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color={complete ? "secondary" : "primary"}
                            disabled={!isValid || complete}
                            className={classes.submit}
                        >
                            {complete ? 'Done' : 'Sign Up'}
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </div>
                </form>
            </div>
        </Container>
    )
}


export default Home;
