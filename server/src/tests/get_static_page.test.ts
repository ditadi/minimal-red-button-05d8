
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { getStaticPage } from '../handlers/get_static_page';

describe('getStaticPage', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return HTML content with correct content type', async () => {
    const result = await getStaticPage();

    expect(result.contentType).toEqual('text/html');
    expect(result.html).toBeDefined();
    expect(typeof result.html).toBe('string');
  });

  it('should return valid HTML document structure', async () => {
    const result = await getStaticPage();

    // Check for basic HTML structure
    expect(result.html).toContain('<!DOCTYPE html>');
    expect(result.html).toContain('<html lang="en">');
    expect(result.html).toContain('<head>');
    expect(result.html).toContain('<body>');
    expect(result.html).toContain('</html>');
  });

  it('should contain a red button with proper styling', async () => {
    const result = await getStaticPage();

    // Check for button element
    expect(result.html).toContain('<button class="red-button"');
    expect(result.html).toContain('</button>');
    
    // Check for CSS styling
    expect(result.html).toContain('background-color: red');
    expect(result.html).toContain('width: 100px');
    expect(result.html).toContain('height: 50px');
  });

  it('should have centered layout styling', async () => {
    const result = await getStaticPage();

    // Check for centering CSS
    expect(result.html).toContain('display: flex');
    expect(result.html).toContain('justify-content: center');
    expect(result.html).toContain('align-items: center');
    expect(result.html).toContain('height: 100vh');
  });

  it('should include hover effect styling', async () => {
    const result = await getStaticPage();

    // Check for hover effect
    expect(result.html).toContain('.red-button:hover');
    expect(result.html).toContain('background-color: darkred');
  });
});
