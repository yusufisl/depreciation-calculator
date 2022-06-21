import { useState, useEffect } from 'react';
import DepreciationForm from '../DepreciationForm';
import { currencyFormatter } from '../../utils';
import { calculateSumOfTheYearDepreciation } from '../../lib/depreciation-formulas';

export default function SumOfTheYear() {
  const [depreciation, setDepreciation] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    setDepreciation(
      calculateSumOfTheYearDepreciation(values)
    );
  }, [values]);

  return (
    <div>
      <DepreciationForm
        className="grid grid-cols-3 space-y-0 gap-8 mb-8"
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
        ]}
      />

      {(depreciation.rows && depreciation.rows.length > 0) ? (
        <>
          <div className="mb-5">Total Depresiasi: <span className="text-[#61fbc0]">{currencyFormatter(depreciation.totalDepreciation)}</span></div>
          <table className="text-base">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300">Tahun</th>
                <th className="py-2 px-4 border border-gray-300">Nilai Buku Awal Tahun</th>
                <th className="py-2 px-4 border border-gray-300">Presentase Depresiasi</th>
                <th className="py-2 px-4 border border-gray-300">Jumlah Depresiasi</th>
                <th className="py-2 px-4 border border-gray-300">Akumulasi Depresiasi</th>
                <th className="py-2 px-4 border border-gray-300">Nilai Buku Akhir Tahun</th>
              </tr>
            </thead>
            <tbody>
              {depreciation.rows.map((row) => (
                <tr key={row.year}>
                  <td className="py-2 px-4 border border-gray-300 text-center">{row.year}</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_start)}</td>
                  <td className="py-2 px-4 border border-gray-300">{Number(row.depreciation_percent * 100).toFixed(0)}%</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.depreciation_expense)}</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.accumulated_depreciation)}</td>
                  <td className="py-2 px-4 border border-gray-300">{currencyFormatter(row.bv_end)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-gray-400 mt-10">Masukkan nilai untuk menghitung.</div>
      )}
    </div>
  )
}
