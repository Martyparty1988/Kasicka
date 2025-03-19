import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  InputAdornment,
  Alert
} from '@mui/material';
import { useSettings } from '../context/SettingsContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { settings, updateSetting, updateSettings, resetSettings } = useSettings();
  const { user, changePassword } = useAuth();
  
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Současné heslo je povinné'),
      newPassword: Yup.string()
        .min(8, 'Heslo musí mít alespoň 8 znaků')
        .required('Nové heslo je povinné'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Hesla se musí shodovat')
        .required('Potvrzení hesla je povinné')
    }),
    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        const success = await changePassword(values.currentPassword, values.newPassword);
        if (success) {
          resetForm();
          setStatus({ success: 'Heslo bylo úspěšně změněno' });
        } else {
          setStatus({ error: 'Nepodařilo se změnit heslo' });
        }
      } catch (error) {
        setStatus({ error: 'Došlo k chybě při změně hesla' });
      }
    }
  });

  const handleGuestCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      updateSetting('guestCount', value);
    }
  };

  const handleNightsCountChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      updateSetting('nightsCount', value);
    }
  };

  const handleCurrencyChange = (e) => {
    updateSetting('currency', e.target.value);
  };

  const handleExchangeRateChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 0) {
      updateSetting('exchangeRate', value);
    }
  };

  const handleDiscountToggle = () => {
    updateSetting('applyDiscount', !settings.applyDiscount);
  };

  const handleDiscountPercentageChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      updateSetting('discountPercentage', value);
    }
  };

  const handlePaymentMethodChange = (e) => {
    updateSetting('paymentMethod', e.target.value);
  };

  const handleLanguageChange = (e) => {
    updateSetting('language', e.target.value);
  };

  const handleDarkModeToggle = () => {
    updateSetting('darkMode', !settings.darkMode);
  };

  const handleResetSettings = () => {
    resetSettings();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Nastavení
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nastavení objednávek
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Počet hostů"
                    type="number"
                    value={settings.guestCount}
                    onChange={handleGuestCountChange}
                    inputProps={{ min: 1 }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Počet nocí"
                    type="number"
                    value={settings.nightsCount}
                    onChange={handleNightsCountChange}
                    inputProps={{ min: 1 }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="currency-label">Měna</InputLabel>
                    <Select
                      labelId="currency-label"
                      id="currency"
                      value={settings.currency}
                      label="Měna"
                      onChange={handleCurrencyChange}
                    >
                      <MenuItem value="CZK">CZK</MenuItem>
                      <MenuItem value="EUR">EUR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Směnný kurz (CZK/EUR)"
                    type="number"
                    value={settings.exchangeRate}
                    onChange={handleExchangeRateChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">1€ =</InputAdornment>,
                      endAdornment: <InputAdornment position="end">Kč</InputAdornment>,
                    }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.applyDiscount}
                        onChange={handleDiscountToggle}
                      />
                    }
                    label="Aplikovat slevu"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Výše slevy (%)"
                    type="number"
                    value={settings.discountPercentage}
                    onChange={handleDiscountPercentageChange}
                    disabled={!settings.applyDiscount}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    inputProps={{ min: 0, max: 100 }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="payment-method-label">Způsob platby</InputLabel>
                    <Select
                      labelId="payment-method-label"
                      id="payment-method"
                      value={settings.paymentMethod}
                      label="Způsob platby"
                      onChange={handlePaymentMethodChange}
                    >
                      <MenuItem value="cash">Hotově</MenuItem>
                      <MenuItem value="card">Kartou</MenuItem>
                      <MenuItem value="unpaid">Neplaceno</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nastavení aplikace
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel id="language-label">Jazyk</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={settings.language}
                  label="Jazyk"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="cs">Čeština</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={handleDarkModeToggle}
                  />
                }
                label="Tmavý režim"
                sx={{ mt: 2 }}
              />

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleResetSettings}
                sx={{ mt: 3 }}
              >
                Obnovit výchozí nastavení
              </Button>
            </CardContent>
          </Card>

          {user && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Změna hesla
                </Typography>

                {formik.status?.success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {formik.status.success}
                  </Alert>
                )}

                {formik.status?.error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {formik.status.error}
                  </Alert>
                )}

                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    fullWidth
                    id="currentPassword"
                    name="currentPassword"
                    label="Současné heslo"
                    type="password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                    helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    id="newPassword"
                    name="newPassword"
                    label="Nové heslo"
                    type="password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Potvrzení nového hesla"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    margin="normal"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Změnit heslo
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
