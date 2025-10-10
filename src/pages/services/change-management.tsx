import Layout from '@/components/layout/Layout';

export default function ChangeManagement() {
  return (
    <Layout
      title='Change Management'
      description='Guide your organization through successful transformation initiatives with VR NextGEN Solutions.'
    >
      <div className='min-h-screen bg-gradient-to-br from-white to-gray-50 py-16'>
        <div className='max-w-4xl mx-auto px-4 md:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6'>
              <div className='w-2 h-2 bg-gold rounded-full animate-pulse' />
              Change Management
            </div>
            <h1 className='text-4xl md:text-5xl font-bold text-black mb-6'>
              Change Management Services
            </h1>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Guide your organization through successful transformation initiatives with proven
              change management strategies.
            </p>
          </div>

          <div className='bg-white rounded-2xl shadow-lg p-8 md:p-12'>
            <div className='prose prose-lg max-w-none'>
              <h2 className='text-2xl font-bold text-black mb-6'>Service Overview</h2>
              <p className='text-gray-600 leading-relaxed mb-6'>
                Our change management services help organizations navigate complex transformations
                by providing structured approaches to managing change, building stakeholder buy-in,
                and ensuring successful implementation. We focus on creating sustainable change that
                delivers lasting business value.
              </p>

              <h3 className='text-xl font-semibold text-black mb-4'>Key Features</h3>
              <ul className='space-y-3 mb-8'>
                <li className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0'></div>
                  <span className='text-gray-600'>Organizational Change and Transformation</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0'></div>
                  <span className='text-gray-600'>Training Programs and Skill Development</span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0'></div>
                  <span className='text-gray-600'>
                    Communication Strategy and Stakeholder Engagement
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0'></div>
                  <span className='text-gray-600'>Success Metrics and Change Measurement</span>
                </li>
              </ul>

              <div className='bg-gold/10 rounded-xl p-6 mb-8'>
                <h3 className='text-xl font-semibold text-black mb-4'>
                  Why Choose Our Change Management?
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Our change management experts use proven methodologies and best practices to help
                  organizations successfully navigate complex transformations. We focus on building
                  internal capabilities and creating sustainable change that drives long-term
                  business success.
                </p>
              </div>

              <div className='text-center'>
                <button className='px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300 btn-enhanced'>
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
