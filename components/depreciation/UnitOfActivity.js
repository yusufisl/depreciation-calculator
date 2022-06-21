import { useState, useEffect } from 'react';
import DepreciationForm from '../DepreciationForm';
import { currencyFormatter } from '../../utils';
import { calculateUnitOfActivityDepreciation } from '../../lib/depreciation-formulas';

export default function UnitOfActivity() {
  const [depreciation, setDepreciation] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setDepreciation(
      calculateUnitOfActivityDepreciation(values)
    );
  }, [values]);
  
  return (
    <div>
      <div className="md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4 mb-6">
          <DepreciationForm
            onChange={(value) => setValues({ ...values, ...value })}
            schema={[
              {
                label: 'Nilai Aset',
                key: 'asset',
                placeholder: 'Masukkan nilai aset',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                  prefix: 'Rp ',
                },
              },
              {
                label: 'Nilai Residu',
                key: 'salvage',
                placeholder: 'Masukkan nilai residu',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                  prefix: 'Rp ',
                },
              },
              {
                label: 'Kapasitas Pemakaian (Unit)',
                key: 'useful_unit',
                placeholder: 'Masa Pakai Barang (hr, km, ltr, kg, etc)',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                },
              },
              {
                label: 'Periode Pemakaian (Unit)',
                key: 'unit_used',
                placeholder: 'Periode Pemakaian Barang (hr, km, ltr, kg, etc)',
                props: {
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                },
              },
            ]}
          />
        </div>

        <div className="md:col-span-8">
          {(depreciation.depreciation_for_period) ? (
            <div className="space-y-5 m-7">
              <div>Biaya Penyusutan: <span className="text-[#61fbc0]">{currencyFormatter(depreciation.depreciation_for_period)}</span></div>
              <div>Biaya Penyusutan Per Unit: <span className="text-[#61fbc0]">{currencyFormatter(depreciation.depreciation_per_unit)}</span></div>
            </div>
          ) : (
            <div className="text-gray-400 m-5">Masukkan nilai untuk menghitung.</div>
          )}
        </div>
      </div>
    </div>
  )
}
