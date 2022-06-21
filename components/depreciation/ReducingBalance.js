import { useState, useEffect } from 'react';
import DepreciationForm from '../DepreciationForm';
import { currencyFormatter } from '../../utils';
import { calculateReducingBalance } from '../../lib/depreciation-formulas';

export default function ReducingBalance() {
  const [depreciation, setDepreciation] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setDepreciation(
      calculateReducingBalance(values)
    );
  }, [values]);

  return (
    <div>
      <div className="md:grid md:grid-cols-12 md:gap-10">
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
                label: 'Masa Manfaat Aset',
                key: 'useful_life',
                placeholder: 'Masa Manfaat Aset (Tahun)',
                props: {
                  isAllowed: ({ floatValue }) => floatValue <= 100,
                },
              },
              {
                label: 'Rate Depresiasi (%)',
                key: 'depreciation_rate',
                placeholder: 'Rate Depresiasi',
              },
            ]}
          />
        </div>

        <div className="md:col-span-8">
          {(values.depreciation_rate && values.salvage && values.useful_life && values.asset) ? (
            <>
              <table className="text-base mt-8">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border border-gray-300">Tahun</th>
                    <th className="py-2 px-4 border border-gray-300">Nilai Buku Awal Tahun</th>
                    <th className="py-2 px-4 border border-gray-300">Jumlah Depresiasi</th>
                    <th className="py-2 px-4 border border-gray-300">Akumulasi Depresiasi</th>
                    <th className="py-2 px-4 border border-gray-300">Nilai Buku Akhir Tahun</th>
                  </tr>
                </thead>
                <tbody>
                  {depreciation.rows.map((row) => (
                    <tr>
                      <td className="py-2 px-4 border border-gray-300 text-center">{row.year}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_start)}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.depreciation_amount)}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.accumulated_depreciation)}</td>
                      <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_end)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="text-gray-400 mt-10 md:m-5">Masukkan nilai untuk menghitung.</div>
          )}
        </div>
      </div>
    </div>
  )
}
